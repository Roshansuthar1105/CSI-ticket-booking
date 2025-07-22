const express = require('express');
const Receipt = require('../models/Receipt');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user receipts
router.get('/my-receipts', auth, async (req, res) => {
  try {
    const receipts = await Receipt.find({ userId: req.user._id })
      .populate('bookingId')
      .sort({ createdAt: -1 });

    res.json(receipts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get receipt by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id)
      .populate('bookingId')
      .populate('userId');

    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }

    // Check if user owns this receipt
    if (receipt.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(receipt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
