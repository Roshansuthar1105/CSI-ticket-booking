const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedRouter = require('./routes/seed');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'https://themovieflixs.netlify.app',
    'https://movieflex-tickets.netlify.app', // Your Netlify frontend
    'http://localhost:3000', // For local development
    process.env.CLIENT_URL // From environment variables
  ].filter(Boolean), // Remove any falsy values
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/receipts', require('./routes/receipts'));
app.use('/api/seed', seedRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});