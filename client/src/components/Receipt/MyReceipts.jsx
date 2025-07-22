import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';
import toast from 'react-hot-toast';

const MyReceipts = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchReceipts();
  }, [user]);

  const fetchReceipts = async () => {
    try {
      const response = await API.get('/receipts/my-receipts');
      setReceipts(response.data);
    } catch (error) {
      toast.error('Failed to fetch receipts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">My Receipts</h1>
        
        {receipts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">You don't have any receipts yet.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-amber-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {receipts.map(receipt => (
              <div key={receipt._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold">Receipt #{receipt.receiptNumber}</h2>
                      <p className="text-gray-600 text-sm">
                        {formatDate(receipt.createdAt)}
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Confirmed
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-amber-500 mb-1">Movie</h3>
                      <p className="text-gray-700">{receipt.movieTitle}</p>
                      <p className="text-gray-600 text-sm">
                        {formatDate(receipt.showDate)} | {receipt.showTime}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-500 mb-1">Seats</h3>
                      <div className="flex flex-wrap gap-2">
                        {receipt.seats.map((seat, index) => (
                          <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                            {seat.row}{seat.number}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                    <span className="text-gray-700">Total Amount:</span>
                    <span className="text-lg font-bold text-amber-500">₹{receipt.totalAmount}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-3 flex justify-end">
                  <button
                    onClick={() => navigate(`/receipt/${receipt._id}`)}
                    className="text-amber-500 hover:text-yellow-600 font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReceipts;