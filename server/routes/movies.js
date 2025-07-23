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
    const indianMovies = [
      {
        title: "RRR",
        description: "A fictional story about two Indian revolutionaries who fought against British colonial rule.",
        duration: "3h 7m",
        genre: "Action, Drama, History",
        rating: 8.0,
        image: "https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg",
        trailer: "https://www.youtube.com/watch?v=G8KpPw303PY",
        cast: ["N.T. Rama Rao Jr.", "Ram Charan", "Alia Bhatt", "Ajay Devgn"],
        director: "S.S. Rajamouli",
        language: "Telugu, Hindi",
        releaseDate: new Date("2022-03-25"),
        showTimes: [
          {
            time: "10:30 AM",
            date: new Date("2024-01-15"),
            price: 200,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "2:30 PM",
            date: new Date("2024-01-15"),
            price: 250,
            availableSeats: 100,
            bookedSeats: []
          }
        ]
      },
      {
        title: "Dangal",
        description: "Former wrestler Mahavir Singh Phogat trains his daughters to become world-class wrestlers.",
        duration: "2h 41m",
        genre: "Biography, Drama, Sport",
        rating: 8.8,
        image: "https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_FMjpg_UX1000_.jpg",
        trailer: "https://www.youtube.com/watch?v=x_7YlGv9u1g",
        cast: ["Aamir Khan", "Sakshi Tanwar", "Fatima Sana Shaikh", "Sanya Malhotra"],
        director: "Nitesh Tiwari",
        language: "Hindi",
        releaseDate: new Date("2016-12-23"),
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
          }
        ]
      },
      {
        title: "Baahubali: The Beginning",
        description: "In ancient India, a warrior protects a princess and discovers his royal lineage.",
        duration: "2h 39m",
        genre: "Action, Drama, Fantasy",
        rating: 8.0,
        image: "https://m.media-amazon.com/images/M/MV5BYWVlMjVhZWYtNWViNC00ODFkLTk1MmItYjU1MDY5ZDdhMTU3XkEyXkFqcGdeQXVyODIwMDI1NjM@._V1_FMjpg_UX1000_.jpg",
        trailer: "https://www.youtube.com/watch?v=3NQRhE772b0",
        cast: ["Prabhas", "Rana Daggubati", "Anushka Shetty", "Tamannaah Bhatia"],
        director: "S.S. Rajamouli",
        language: "Telugu, Tamil",
        releaseDate: new Date("2015-07-10"),
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
          }
        ]
      },
      {
        title: "3 Idiots",
        description: "Two friends search for their long-lost college companion who inspired them to think differently.",
        duration: "2h 50m",
        genre: "Comedy, Drama",
        rating: 8.4,
        image: "https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
        trailer: "https://www.youtube.com/watch?v=K0eDlFX9GMc",
        cast: ["Aamir Khan", "Madhavan", "Sharman Joshi", "Kareena Kapoor"],
        director: "Rajkumar Hirani",
        language: "Hindi",
        releaseDate: new Date("2009-12-25"),
        showTimes: [
          {
            time: "1:00 PM",
            date: new Date("2024-01-15"),
            price: 150,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "5:00 PM",
            date: new Date("2024-01-15"),
            price: 200,
            availableSeats: 100,
            bookedSeats: []
          }
        ]
      },
      {
        title: "KGF: Chapter 1",
        description: "In the 1970s, a gangster rises from poverty to become the king of a gold mine.",
        duration: "2h 35m",
        genre: "Action, Crime, Drama",
        rating: 8.2,
        image: "https://m.media-amazon.com/images/M/MV5BZDNlNzBjMGUtYTA0Yy00OTI2LWJmZjMtODliYmUyYTI0OGFmXkEyXkFqcGdeQXVyODIwMDI1NjM@._V1_FMjpg_UX1000_.jpg",
        trailer: "https://www.youtube.com/watch?v=qXgF-iJ_ezE",
        cast: ["Yash", "Srinidhi Shetty", "Ramachandra Raju", "Anant Nag"],
        director: "Prashanth Neel",
        language: "Kannada",
        releaseDate: new Date("2018-12-21"),
        showTimes: [
          {
            time: "2:00 PM",
            date: new Date("2024-01-15"),
            price: 220,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "6:00 PM",
            date: new Date("2024-01-15"),
            price: 270,
            availableSeats: 100,
            bookedSeats: []
          }
        ]
      },
      {
        title: "Ponniyin Selvan: Part 1",
        description: "A historical drama about the early life of Chola prince Arunmozhi Varman.",
        duration: "2h 47m",
        genre: "Action, Adventure, Drama",
        rating: 7.8,
        image: "https://m.media-amazon.com/images/M/MV5BODBiNzYxZjYtOTVhYS00N2I4LThkYjktZmQ5YmIyYzY0Y2U0XkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_FMjpg_UX1000_.jpg",
        trailer: "https://www.youtube.com/watch?v=6yKJ1nYl3t0",
        cast: ["Vikram", "Aishwarya Rai Bachchan", "Karthi", "Jayam Ravi"],
        director: "Mani Ratnam",
        language: "Tamil",
        releaseDate: new Date("2022-09-30"),
        showTimes: [
          {
            time: "3:00 PM",
            date: new Date("2024-01-15"),
            price: 250,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "7:00 PM",
            date: new Date("2024-01-15"),
            price: 300,
            availableSeats: 100,
            bookedSeats: []
          }
        ]
      },
      {
        title: "Andhadhun",
        description: "A blind pianist gets entangled in a series of mysterious events after witnessing a murder.",
        duration: "2h 19m",
        genre: "Crime, Thriller, Mystery",
        rating: 8.3,
        image: "https://m.media-amazon.com/images/M/MV5BZWZhMjhhZmYtOTIzOC00MGYzLWI1OGYtM2ZkN2IxNTI4ZWI3XkEyXkFqcGdeQXVyNDAzNDk0MTQ@._V1_FMjpg_UX1000_.jpg",
        trailer: "https://www.youtube.com/watch?v=2iVYI3VGxDo",
        cast: ["Ayushmann Khurrana", "Tabu", "Radhika Apte", "Anil Dhawan"],
        director: "Sriram Raghavan",
        language: "Hindi",
        releaseDate: new Date("2018-10-05"),
        showTimes: [
          {
            time: "4:00 PM",
            date: new Date("2024-01-15"),
            price: 200,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "8:00 PM",
            date: new Date("2024-01-15"),
            price: 250,
            availableSeats: 100,
            bookedSeats: []
          }
        ]
      },
      {
        title: "Drishyam",
        description: "A man goes to extreme lengths to protect his family from the consequences of an accident.",
        duration: "2h 43m",
        genre: "Crime, Drama, Thriller",
        rating: 8.2,
        image: "https://m.media-amazon.com/images/M/MV5BYmJhZmJlYTItZmZlNy00MGY0LTg0ZGMtNWFkYWU5NTA1YTNhXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg",
        trailer: "https://www.youtube.com/watch?v=AuuX2j14NBg",
        cast: ["Ajay Devgn", "Tabu", "Shriya Saran", "Ishita Dutta"],
        director: "Nishikant Kamat",
        language: "Hindi",
        releaseDate: new Date("2015-07-31"),
        showTimes: [
          {
            time: "5:00 PM",
            date: new Date("2024-01-15"),
            price: 180,
            availableSeats: 100,
            bookedSeats: []
          },
          {
            time: "9:00 PM",
            date: new Date("2024-01-15"),
            price: 220,
            availableSeats: 100,
            bookedSeats: []
          }
        ]
      }
    ];
    // await Movie.deleteMany({});
    // await Movie.insertMany(sampleMovies1);
    await Movie.insertMany(indianMovies);
    res.json({ message: 'Sample movies created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
