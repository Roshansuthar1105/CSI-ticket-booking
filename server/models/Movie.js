const mongoose = require('mongoose');

const showTimeSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true,
    default: 100
  },
  bookedSeats: [{
    row: String,
    number: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
});

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  image: {
    type: String,
    required: true
  },
  trailer: String,
  cast: [String],
  director: String,
  language: String,
  releaseDate: Date,
  showTimes: [showTimeSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
