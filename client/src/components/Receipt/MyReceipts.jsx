import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';
import toast from 'react-hot-toast';
import { FaTicketAlt, FaFilm, FaHome } from 'react-icons/fa';

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
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-18">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-amber-400 flex items-center justify-center">
          <FaTicketAlt className="mr-3" /> My Receipts
        </h1>
        
        {receipts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">You don't have any receipts yet.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-2 rounded-lg flex items-center mx-auto"
            >
              <FaFilm className="mr-2" /> Browse Movies
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {receipts.map(receipt => (
              <div key={receipt._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-amber-500 transition-colors">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-amber-400">Receipt #{receipt.receiptNumber}</h2>
                      <p className="text-gray-400 text-sm">
                        {formatDate(receipt.createdAt)}
                      </p>
                    </div>
                    <span className="bg-emerald-900/50 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium border border-emerald-400">
                      Confirmed
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-amber-400 mb-1">Movie</h3>
                      <p className="text-white">{receipt.movieTitle}</p>
                      <p className="text-gray-400 text-sm">
                        {formatDate(receipt.showDate)} | {receipt.showTime}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-400 mb-1">Seats</h3>
                      <div className="flex flex-wrap gap-2">
                        {receipt.seats.map((seat, index) => (
                          <span key={index} className="bg-gray-700 px-2 py-1 rounded-full text-xs text-white">
                            {seat.row}{seat.number}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                    <span className="text-gray-400">Total Amount:</span>
                    <span className="text-lg font-bold text-amber-400">₹{receipt.totalAmount}</span>
                  </div>
                </div>
                
                <div className="bg-gray-700/50 px-6 py-3 flex justify-end border-t border-gray-600">
                  <button
                    onClick={() => navigate(`/receipt/${receipt._id}`)}
                    className="text-amber-400 hover:text-amber-300 font-medium flex items-center"
                  >
                    View Details <span className="ml-1">→</span>
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