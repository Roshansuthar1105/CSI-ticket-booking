const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create sample movies (for development)
router.post('/seed', async (req, res) => {
  try {
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
      },
      {
        title: "Inception",
        description: "A thief who steals corporate secrets through dream-sharing technology.",
        duration: "2h 28m",
        genre: "Action, Sci-Fi, Thriller",
        rating: 8.8,
        image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
        trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
        cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Elliot Page"],
        director: "Christopher Nolan",
        language: "English",
        releaseDate: new Date("2010-07-16"),
        showTimes: [
          {
            time: "12:00 PM",
            date: new Date("2024-01-15"),
            price: 200,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "4:00 PM",
            date: new Date("2024-01-15"),
            price: 250,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "8:00 PM",
            date: new Date("2024-01-15"),
            price: 300,
            availableSeats: 100,
            bookedSeats: []
          }
        ]
      },
      {
        title: "Interstellar",
        description: "A team of explorers travel through a wormhole in space.",
        duration: "2h 49m",
        genre: "Adventure, Drama, Sci-Fi",
        rating: 8.6,
        image: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
        trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Bill Irwin"],
        director: "Christopher Nolan",
        language: "English",
        releaseDate: new Date("2014-11-07"),
        showTimes: [
          {
            time: "1:00 PM",
            date: new Date("2024-01-15"),
            price: 220,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "5:00 PM",
            date: new Date("2024-01-15"),
            price: 270,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "9:00 PM",
            date: new Date("2024-01-15"),
            price: 320,
            availableSeats: 100,
            bookedSeats: []
          }
        ]
      },
      {
        title: "The Matrix",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality.",
        duration: "2h 16m",
        genre: "Action, Sci-Fi",
        rating: 8.7,
        image: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
        trailer: "https://www.youtube.com/watch?v=vKQi3bIA1HI",
        cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"],
        director: "The Wachowskis",
        language: "English",
        releaseDate: new Date("1999-03-31"),
        showTimes: [
          {
            time: "10:30 AM",
            date: new Date("2024-01-15"),
            price: 150,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "2:30 PM",
            date: new Date("2024-01-15"),
            price: 200,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "6:30 PM",
            date: new Date("2024-01-15"),
            price: 250,
            availableSeats: 100,
            bookedSeats: []
          }
        ]
      }
    ];

    await Movie.deleteMany({});
    await Movie.insertMany(sampleMovies);
    res.json({ message: 'Sample movies created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
