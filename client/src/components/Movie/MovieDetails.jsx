import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';
import toast from 'react-hot-toast';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await API.get(`/movies/${id}`);
      setMovie(response.data);
    } catch (error) {
      toast.error('Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (showTimeId) => {
    if (!user) {
      toast.error('Please login to book tickets');
      navigate('/login');
      return;
    }
    navigate(`/booking/${id}/${showTimeId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Movie not found</h2>
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
    <div className="min-h-screen bg-gray-50">
      {/* Movie Header */}
      <div className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                  ⭐ {movie.rating}
                </span>
                <span className="text-gray-300">{movie.duration}</span>
                <span className="text-gray-300">{movie.genre}</span>
              </div>
              
              <p className="text-lg mb-6 text-gray-300">{movie.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-amber-500 mb-2">Director</h3>
                  <p className="text-gray-300">{movie.director}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-500 mb-2">Language</h3>
                  <p className="text-gray-300">{movie.language}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-amber-500 mb-2">Cast</h3>
                <p className="text-gray-300">{movie.cast?.join(', ')}</p>
              </div>
              
              {movie.trailer && (
                <div className="mb-6">
                  <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg inline-block"
                  >
                    Watch Trailer
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Show Times */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Show Times
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {movie.showTimes?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No show times available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {movie.showTimes?.map((showTime) => (
                <div key={showTime._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{showTime.time}</h3>
                    <p className="text-gray-600">
                      {new Date(showTime.date).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Price:</span>
                      <span className="text-amber-500 font-semibold text-lg">
                        ₹{showTime.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Available:</span>
                      <span className="text-emerald-500 font-semibold">
                        {showTime.availableSeats} seats
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleBooking(showTime._id)}
                    disabled={showTime.availableSeats === 0}
                    className="w-full bg-amber-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {showTime.availableSeats === 0 ? 'Sold Out' : 'Book Tickets'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;