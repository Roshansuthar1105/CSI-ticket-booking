import React from 'react';
import { FaMoneyBillWave, FaClock, FaExchangeAlt } from 'react-icons/fa';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Refund <span className="text-amber-500">Policy</span>
          </h1>
          <p className="text-xl text-gray-300">
            Last Updated: January 1, 2024
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-12">
          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaMoneyBillWave className="text-amber-500 mr-3" />
              General Refund Policy
            </h2>
            <p className="text-gray-300 mb-4">
              At MovieFlix, we understand that plans can change. Our refund policy is designed to be fair to both our customers and our theater partners.
            </p>
            <p className="text-gray-300">
              Please note that all refunds are subject to the individual theater's policy, which may vary. The refund availability and processing time will be clearly displayed during the booking process.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaClock className="text-amber-500 mr-3" />
              Cancellation Timeframes
            </h2>
            <div className="space-y-4">
              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-amber-400">Standard Bookings</h3>
                <p className="text-gray-300 mt-2">
                  Most theaters allow cancellations up to 1 hour before the showtime. The refund amount will be credited back to your original payment method within 7-10 business days.
                </p>
              </div>
              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-amber-400">Special Events</h3>
                <p className="text-gray-300 mt-2">
                  For special screenings, festivals, or premium events, cancellations may not be available or may have different timeframes. These will be clearly indicated during booking.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-400">Cancelled Shows</h3>
                <p className="text-gray-300 mt-2">
                  If a show is cancelled by the theater, you will receive a full refund automatically. The amount will be credited within 5-7 business days.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaExchangeAlt className="text-amber-500 mr-3" />
              Exchange Policy
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Ticket exchanges are subject to availability and theater policies. You may request an exchange for a different showtime of the same movie at the same theater, subject to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Availability of seats for the new showtime</li>
                <li>Payment of any price difference if applicable</li>
                <li>The exchange request being made at least 2 hours before the original showtime</li>
              </ul>
              <p>
                To request an exchange, please contact our customer support team with your booking details.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Non-Refundable Items</h2>
            <div className="text-gray-300 space-y-2">
              <p>The following are typically non-refundable:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Convenience fees</li>
                <li>Processing fees</li>
                <li>Donations or charity contributions made during booking</li>
                <li>Gift card purchases (may be eligible for exchange)</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <p className="text-gray-300">
              For any questions about our refund policy or to request a refund, please contact our customer support team at support@movieflix.com or call +91 1234567890.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;