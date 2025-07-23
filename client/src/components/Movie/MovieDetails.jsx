import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaTicketAlt, FaClock, FaLanguage, FaUser, FaStar } from 'react-icons/fa';

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
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-amber-400 hover:text-amber-300 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </div>

      {/* Movie Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="relative group overflow-hidden rounded-xl shadow-2xl">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <FaStar className="mr-1" /> {movie.rating}
                </span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="flex items-center text-sm bg-gray-800 px-3 py-1 rounded-full">
                <FaClock className="mr-2 text-amber-400" /> {movie.duration}
              </span>
              <span className="flex items-center text-sm bg-gray-800 px-3 py-1 rounded-full">
                <FaLanguage className="mr-2 text-amber-400" /> {movie.language}
              </span>
              <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">
                {movie.genre}
              </span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">{movie.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold text-amber-400 mb-2 flex items-center">
                  <FaUser className="mr-2" /> Director
                </h3>
                <p className="text-gray-300">{movie.director}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold text-amber-400 mb-2">Cast</h3>
                <p className="text-gray-300">{movie.cast?.join(', ')}</p>
              </div>
            </div>
            
            {movie.trailer && (
              <a
                href={movie.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Trailer
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Show Times */}
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 relative inline-block mx-auto">
            <span className="relative z-10 px-4 bg-gray-800">
              Show <span className="text-amber-500">Times</span>
              
            </span>
          </h2>
          
          {movie.showTimes?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-lg">No show times available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {movie.showTimes?.map((showTime) => (
                <div key={showTime._id} className="bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-semibold">{showTime.time}</h3>
                      <p className="text-gray-400 text-sm">
                        {new Date(showTime.date).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="mb-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Price:</span>
                        <span className="text-amber-400 font-semibold">
                          ₹{showTime.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Available:</span>
                        <span className={`font-semibold ${
                          showTime.availableSeats > 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {showTime.availableSeats} seats
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleBooking(showTime._id)}
                      disabled={showTime.availableSeats === 0}
                      className={`w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
                        showTime.availableSeats === 0 
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                          : 'bg-amber-500 hover:bg-amber-600 text-white'
                      }`}
                    >
                      <FaTicketAlt className="mr-2" />
                      {showTime.availableSeats === 0 ? 'Sold Out' : 'Book Tickets'}
                    </button>
                  </div>
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