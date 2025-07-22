const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiptNumber: {
    type: String,
    required: true,
    unique: true
  },
  movieTitle: String,
  showTime: String,
  showDate: Date,
  seats: [{
    row: String,
    number: Number
  }],
  totalAmount: Number,
  paymentMethod: String,
  transactionId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Receipt', receiptSchema);
