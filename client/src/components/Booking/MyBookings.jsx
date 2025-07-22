import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get('/bookings/my-bookings');
      setBookings(response.data.data);
    } catch (err) {
      setError('Failed to fetch bookings');
      toast.error('Failed to fetch bookings');
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

  const getShowTimeDetails = (booking) => {
    return booking.movieId.showTimes.find(
      st => st._id.toString() === booking.showTimeId.toString()
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchBookings}
            className="bg-amber-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">My Bookings</h1>
        
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">You don't have any bookings yet.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-amber-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {bookings.length>0 && bookings.map(booking => {
              const showTime = getShowTimeDetails(booking);
              
              return (
                <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <img
                          src={booking.movieId.image}
                          alt={booking.movieId.title}
                          className="w-16 h-16 object-cover rounded-lg"
                          loading="lazy"
                        />
                        <div>
                          <h2 className="text-xl font-bold">{booking.movieId.title}</h2>
                          <p className="text-gray-600 text-sm">
                            {formatDate(booking.createdAt)}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.bookingStatus === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        booking.bookingStatus === 'cancelled' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-amber-500 mb-1">Show Time</h3>
                        <p className="text-gray-700">
                          {showTime ? (
                            <>
                              {new Date(showTime.date).toLocaleDateString()} | {showTime.time}
                            </>
                          ) : 'Show time not available'}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-amber-500 mb-1">Seats</h3>
                        <div className="flex flex-wrap gap-2">
                          {booking.seats.map((seat, index) => (
                            <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                              {seat.row}{seat.number}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                      <span className="text-gray-700">Total Amount:</span>
                      <span className="text-lg font-bold text-amber-500">
                        ₹{booking.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-6 py-3 flex justify-end">
                    <button
                      onClick={() => navigate(`/receipt/${booking._id}`)}
                      className="text-amber-500 hover:text-yellow-600 font-medium transition-colors"
                    >
                      View Receipt →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;