import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';
import toast from 'react-hot-toast';

const Receipt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReceipt();
  }, [id]);

  const fetchReceipt = async () => {
    try {
      const response = await API.get(`/receipts/${id}`);
      setReceipt(response.data);
    } catch (error) {
      toast.error('Failed to fetch receipt details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Receipt not found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-amber-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Receipt Header */}
          <div className="bg-gray-800 text-white p-6 text-center">
            <h1 className="text-3xl font-bold mb-2">MovieFlix</h1>
            <p className="text-gray-300">Your Ultimate Movie Booking Experience</p>
          </div>

          {/* Receipt Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Booking Receipt</h2>
                <p className="text-gray-600">#{receipt.receiptNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Date: {formatDate(receipt.createdAt)}</p>
                <p className="text-gray-600">Status: <span className="text-emerald-500 font-medium">Confirmed</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Movie Details</h3>
                <p className="font-medium">{receipt.movieTitle}</p>
                <p className="text-gray-600">
                  {formatDate(receipt.showDate)} | {receipt.showTime}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
                <p className="font-medium">{user?.name}</p>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-gray-600">{user?.phone}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Seat Details</h3>
              <div className="flex flex-wrap gap-2">
                {receipt.seats.map((seat, index) => (
                  <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {seat.row}{seat.number}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-medium">₹{receipt.totalAmount}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-700">Payment Method:</span>
                <span className="font-medium">{receipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-700">Transaction ID:</span>
                <span className="font-medium">{receipt.transactionId}</span>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <span className="text-lg font-bold">Total Amount:</span>
                <span className="text-xl font-bold text-amber-500">₹{receipt.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Receipt Footer */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="text-center text-gray-600 mb-4">
              <p>Thank you for booking with MovieFlix!</p>
              <p>Please arrive at least 15 minutes before the showtime.</p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.print()}
                className="px-6 py-2 border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white"
              >
                Print Receipt
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-amber-500 hover:bg-yellow-600 text-white rounded-lg"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;