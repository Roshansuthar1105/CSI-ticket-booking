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

// Create booking order
router.post('/create-order', auth, async (req, res) => {
  try {
    const { movieId, showTimeId, seats, totalAmount } = req.body;

    // Verify movie and showtime
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const showTime = movie.showTimes.id(showTimeId);
    if (!showTime) {
      return res.status(404).json({ message: 'Show time not found' });
    }

    // Check if seats are available
    const bookedSeats = showTime.bookedSeats;
    const requestedSeats = seats.map(seat => `${seat.row}-${seat.number}`);
    const alreadyBooked = bookedSeats.some(seat => 
      requestedSeats.includes(`${seat.row}-${seat.number}`)
    );

    if (alreadyBooked) {
      return res.status(400).json({ message: 'Some seats are already booked' });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: totalAmount * 100, // Amount in paise
      currency: 'INR',
      receipt: `booking_${Date.now()}`,
      notes: {
        movieId,
        showTimeId,
        userId: req.user._id.toString()
      }
    });

    // Create booking record
    const booking = new Booking({
      userId: req.user._id,
      movieId,
      showTimeId,
      seats,
      totalAmount,
      razorpayOrderId: order.id
    });

    await booking.save();

    res.json({
      orderId: order.id,
      amount: totalAmount,
      bookingId: booking._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify payment and confirm booking
router.post('/verify-payment', auth, async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } = req.body;

    // Verify signature
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    // Update booking
    const booking = await Booking.findById(bookingId).populate('movieId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.bookingStatus = 'confirmed';
    booking.razorpayPaymentId = razorpayPaymentId;
    booking.razorpaySignature = razorpaySignature;
    await booking.save();

    // Update movie seats
    const movie = await Movie.findById(booking.movieId);
    const showTime = movie.showTimes.id(booking.showTimeId);
    
    booking.seats.forEach(seat => {
      showTime.bookedSeats.push({
        row: seat.row,
        number: seat.number,
        userId: req.user._id
      });
    });
    
    showTime.availableSeats -= booking.seats.length;
    await movie.save();

    // Create receipt
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

    res.json({
      message: 'Payment verified and booking confirmed',
      booking,
      receipt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('movieId')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
