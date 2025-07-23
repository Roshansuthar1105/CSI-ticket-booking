import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';
import toast from 'react-hot-toast';
import { FaTicketAlt, FaFilm, FaHome } from 'react-icons/fa';

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
      console.log(response.data.data);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchBookings}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-18">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-amber-400 flex items-center justify-center">
          <FaTicketAlt className="mr-3" /> My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">You don't have any bookings yet.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-2 rounded-lg flex items-center mx-auto"
            >
              <FaFilm className="mr-2" /> Browse Movies
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {bookings.length > 0 && bookings.map(booking => {
              const showTime = getShowTimeDetails(booking);

              return (
                <div key={booking._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-amber-500 transition-colors">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <img
                          src={booking.movieId.image}
                          alt={booking.movieId.title}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-600"
                          loading="lazy"
                        />
                        <div>
                          <h2 className="text-xl font-bold text-white">{booking.movieId.title}</h2>
                          <p className="text-gray-400 text-sm">
                            {formatDate(booking.createdAt)}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${booking.bookingStatus === 'confirmed' ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-400' :
                          booking.bookingStatus === 'cancelled' ? 'bg-red-900/50 text-red-400 border border-red-400' :
                            'bg-yellow-900/50 text-yellow-400 border border-yellow-400'
                        }`}>
                        {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-amber-400 mb-1">Show Time</h3>
                        <p className="text-white">
                          {showTime ? (
                            <>
                              {new Date(showTime.date).toLocaleDateString()} | {showTime.time}
                            </>
                          ) : 'Show time not available'}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-amber-400 mb-1">Seats</h3>
                        <div className="flex flex-wrap gap-2">
                          {booking.seats.map((seat, index) => (
                            <span key={index} className="bg-gray-700 px-2 py-1 rounded-full text-xs text-white">
                              {seat.row}{seat.number}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                      <span className="text-gray-400">Total Amount:</span>
                      <span className="text-lg font-bold text-amber-400">
                        ₹{booking.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-700/50 px-6 py-3 flex justify-end border-t border-gray-600">
                    <button
                      onClick={() => navigate(`/receipt/${booking._id}`)}
                      className={`font-medium flex items-center ${booking.bookingStatus !== "confirmed"
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-amber-400 hover:text-amber-300 cursor-not-allowed"
                        }`}
                      // disabled={booking.bookingStatus !== "confirmed"}
                      disabled={true}
                      aria-disabled={booking.bookingStatus !== "confirmed"}
                      title={booking.bookingStatus !== "confirmed" ? "Only available for confirmed bookings" : ""}
                    >
                      View Receipt <span className="ml-1">→</span>
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