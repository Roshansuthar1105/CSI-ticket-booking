const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Movie = require('../models/Movie');
const Booking = require('../models/Booking');
const Receipt = require('../models/Receipt');
const auth = require('../middleware/auth');

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Helper function for error handling
const handleErrorResponse = (res, statusCode, message, error = null) => {
  console.error(message, error ? error : '');
  return res.status(statusCode).json({ 
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' && error ? error.message : undefined
  });
};

// Validate request body for create-order
const validateCreateOrderRequest = (req) => {
  const { movieId, showTimeId, seats, totalAmount } = req.body;
  
  if (!movieId || !showTimeId || !seats || !totalAmount) {
    return { isValid: false, message: 'Missing required fields' };
  }
  
  if (!Array.isArray(seats) || seats.length === 0) {
    return { isValid: false, message: 'Seats must be a non-empty array' };
  }
  
  if (typeof totalAmount !== 'number' || totalAmount <= 0) {
    return { isValid: false, message: 'Total amount must be a positive number' };
  }
  
  return { isValid: true };
};

// Create booking order
router.post('/create-order', auth, async (req, res) => {
  try {
    // Input validation
    const validation = validateCreateOrderRequest(req);
    if (!validation.isValid) {
      return handleErrorResponse(res, 400, validation.message);
    }

    const { movieId, showTimeId, seats, totalAmount } = req.body;

    // Verify movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return handleErrorResponse(res, 404, 'Movie not found');
    }

    // Verify showtime exists
    const showTime = movie.showTimes.id(showTimeId);
    if (!showTime) {
      return handleErrorResponse(res, 404, 'Show time not found');
    }

    // Check seat availability
    const bookedSeats = showTime.bookedSeats;
    const requestedSeats = seats.map(seat => `${seat.row}-${seat.number}`);
    const alreadyBooked = bookedSeats.some(seat => 
      requestedSeats.includes(`${seat.row}-${seat.number}`)
    );

    if (alreadyBooked) {
      return handleErrorResponse(res, 400, 'Some seats are already booked');
    }

    // Create Razorpay order
    let order;
    try {
      order = await razorpay.orders.create({
        amount: totalAmount * 100, // Amount in paise
        currency: 'INR',
        receipt: `booking_${Date.now()}`,
        notes: {
          movieId,
          showTimeId,
          userId: req.user._id.toString()
        }
      });
    } catch (razorpayError) {
      return handleErrorResponse(res, 500, 'Failed to create Razorpay order', razorpayError);
    }

    // Create booking record
    try {
      const booking = new Booking({
        userId: req.user._id,
        movieId,
        showTimeId,
        seats,
        totalAmount,
        razorpayOrderId: order.id
      });

      await booking.save();

      return res.status(201).json({
        success: true,
        orderId: order.id,
        amount: totalAmount,
        bookingId: booking._id
      });
    } catch (dbError) {
      return handleErrorResponse(res, 500, 'Failed to create booking', dbError);
    }
  } catch (error) {
    return handleErrorResponse(res, 500, 'Internal server error', error);
  }
});

// Validate request body for verify-payment
const validateVerifyPaymentRequest = (req) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } = req.body;
  
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !bookingId) {
    return { isValid: false, message: 'Missing required payment verification fields' };
  }
  
  return { isValid: true };
};

// Verify payment and confirm booking
router.post('/verify-payment', auth, async (req, res) => {
  try {
    // Input validation
    const validation = validateVerifyPaymentRequest(req);
    if (!validation.isValid) {
      return handleErrorResponse(res, 400, validation.message);
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } = req.body;

    // Verify signature
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return handleErrorResponse(res, 400, 'Payment verification failed - invalid signature');
    }

    // Find and update booking
    let booking;
    try {
      booking = await Booking.findById(bookingId).populate('movieId');
      if (!booking) {
        return handleErrorResponse(res, 404, 'Booking not found');
      }

      if (booking.bookingStatus === 'confirmed') {
        return handleErrorResponse(res, 400, 'Booking is already confirmed');
      }

      if (booking.userId.toString() !== req.user._id.toString()) {
        return handleErrorResponse(res, 403, 'Unauthorized to confirm this booking');
      }

      booking.bookingStatus = 'confirmed';
      booking.razorpayPaymentId = razorpayPaymentId;
      booking.razorpaySignature = razorpaySignature;
      await booking.save();
    } catch (dbError) {
      return handleErrorResponse(res, 500, 'Failed to update booking', dbError);
    }

    // Update movie seats
    try {
      const movie = await Movie.findById(booking.movieId);
      if (!movie) {
        return handleErrorResponse(res, 404, 'Associated movie not found');
      }

      const showTime = movie.showTimes.id(booking.showTimeId);
      if (!showTime) {
        return handleErrorResponse(res, 404, 'Associated show time not found');
      }

      // Check again for seat availability (in case of race conditions)
      const bookedSeats = showTime.bookedSeats;
      const requestedSeats = booking.seats.map(seat => `${seat.row}-${seat.number}`);
      const alreadyBooked = bookedSeats.some(seat => 
        requestedSeats.includes(`${seat.row}-${seat.number}`)
      );

      if (alreadyBooked) {
        // Rollback booking status if seats are no longer available
        booking.bookingStatus = 'failed';
        await booking.save();
        return handleErrorResponse(res, 400, 'Some seats are no longer available');
      }

      // Reserve the seats
      booking.seats.forEach(seat => {
        showTime.bookedSeats.push({
          row: seat.row,
          number: seat.number,
          userId: req.user._id
        });
      });
      
      showTime.availableSeats -= booking.seats.length;
      await movie.save();
    } catch (seatError) {
      // Rollback booking status if seat reservation fails
      booking.bookingStatus = 'failed';
      await booking.save();
      return handleErrorResponse(res, 500, 'Failed to reserve seats', seatError);
    }

    // Create receipt
    try {
      const showTime = booking.movieId.showTimes.id(booking.showTimeId);
      const receiptNumber = `RCP${Date.now()}`;
      const receipt = new Receipt({
        bookingId: booking._id,
        userId: req.user._id,
        receiptNumber,
        movieTitle: booking.movieId.title,
        showTime: showTime.time,
        showDate: showTime.date,
        seats: booking.seats,
        totalAmount: booking.totalAmount,
        paymentMethod: 'Razorpay',
        transactionId: razorpayPaymentId
      });

      await receipt.save();

      return res.status(200).json({
        success: true,
        message: 'Payment verified and booking confirmed',
        booking,
        receipt
      });
    } catch (receiptError) {
      return handleErrorResponse(res, 500, 'Booking confirmed but failed to create receipt', receiptError);
    }
  } catch (error) {
    return handleErrorResponse(res, 500, 'Internal server error', error);
  }
});

// Get user bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('movieId')
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    return handleErrorResponse(res, 500, 'Failed to retrieve bookings', error);
  }
});

module.exports = router;