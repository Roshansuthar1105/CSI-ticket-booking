const express = require('express');
const Movie = require('../models/Movie');
const Booking = require('../models/Booking');
const Receipt = require('../models/Receipt');
const router = express.Router();

// Generate random date within a range
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate random seat
function randomSeat() {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  return {
    row: rows[Math.floor(Math.random() * rows.length)],
    number: Math.floor(Math.random() * 20) + 1
  };
}

// Create dummy data
router.post('/', async (req, res) => {
  try {
    // Clear existing data
    await Movie.deleteMany({});
    await Booking.deleteMany({});
    await Receipt.deleteMany({});

    // Sample movies data
    const sampleMovies = [
      {
        title: "Avengers: Endgame",
        description: "The Avengers assemble once more to reverse the damage caused by Thanos.",
        duration: "3h 1m",
        genre: "Action, Adventure, Drama",
        rating: 8.4,
        image: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1000_.jpg",
        trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
        cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth"],
        director: "Anthony Russo, Joe Russo",
        language: "English",
        releaseDate: new Date("2019-04-26"),
        showTimes: [
          {
            time: "10:00 AM",
            date: new Date("2024-01-15"),
            price: 200,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "2:00 PM",
            date: new Date("2024-01-15"),
            price: 250,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "6:00 PM",
            date: new Date("2024-01-15"),
            price: 300,
            availableSeats: 100,
            bookedSeats: []
          }
        ]
      },
      {
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc on Gotham City.",
        duration: "2h 32m",
        genre: "Action, Crime, Drama",
        rating: 9.0,
        image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
        trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
        director: "Christopher Nolan",
        language: "English",
        releaseDate: new Date("2008-07-18"),
        showTimes: [
          {
            time: "11:00 AM",
            date: new Date("2024-01-15"),
            price: 180,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "3:00 PM",
            date: new Date("2024-01-15"),
            price: 220,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "7:00 PM",
            date: new Date("2024-01-15"),
            price: 280,
            availableSeats: 100,
            bookedSeats: []
          }
        ]
      }
    ];

    // Insert movies
    const movies = await Movie.insertMany(sampleMovies);

    // Generate some bookings and receipts
    const bookings = [];
    const receipts = [];
    
    // For each movie and showtime, create some bookings
    for (const movie of movies) {
      for (const showTime of movie.showTimes) {
        // Create 5-10 bookings per showtime
        const numBookings = Math.floor(Math.random() * 6) + 5;
        
        for (let i = 0; i < numBookings; i++) {
          const numSeats = Math.floor(Math.random() * 4) + 1; // 1-4 seats
          const seats = Array.from({ length: numSeats }, () => randomSeat());
          const totalAmount = showTime.price * numSeats;
          
          const booking = new Booking({
            userId: '65d5a9b1e4b0a1b9c8e7f1a2', // Dummy user ID
            movieId: movie._id,
            showTimeId: showTime._id,
            seats,
            totalAmount,
            bookingStatus: 'confirmed',
            paymentId: `pay_${Math.random().toString(36).substring(2, 15)}`,
            razorpayOrderId: `order_${Math.random().toString(36).substring(2, 15)}`,
            razorpayPaymentId: `pay_${Math.random().toString(36).substring(2, 15)}`,
            razorpaySignature: `sig_${Math.random().toString(36).substring(2, 15)}`
          });
          
          await booking.save();
          bookings.push(booking);
          
          // Create receipt for each booking
          const receipt = new Receipt({
            bookingId: booking._id,
            userId: booking.userId,
            receiptNumber: `RCP${Date.now()}${Math.floor(Math.random() * 1000)}`,
            movieTitle: movie.title,
            showTime: showTime.time,
            showDate: showTime.date,
            seats: booking.seats,
            totalAmount: booking.totalAmount,
            paymentMethod: 'Razorpay',
            transactionId: booking.paymentId
          });
          
          await receipt.save();
          receipts.push(receipt);
          
          // Update showtime with booked seats
          showTime.bookedSeats.push(...seats.map(seat => ({
            row: seat.row,
            number: seat.number,
            userId: booking.userId
          })));
          showTime.availableSeats -= numSeats;
        }
      }
      
      // Save the movie with updated showtimes
      await movie.save();
    }

    res.json({
      message: 'Dummy data created successfully',
      stats: {
        movies: movies.length,
        bookings: bookings.length,
        receipts: receipts.length
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;