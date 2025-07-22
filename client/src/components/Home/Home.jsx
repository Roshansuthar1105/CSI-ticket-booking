import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import API from '../../utils/api';
import toast from 'react-hot-toast';

const Home = () => {
//   return (
//     <div className="p-8 space-y-4">
//       <div className="p-4 bg-gray-800 text-white">
//         Should be -gray-800 (#1f2937)
//       </div>
//       <div className="p-4 bg-[#1f2937] text-white">
//         Manual color (should match above)
//       </div>
//       <div className="p-4 bg-amber-500 text-white">
//         Should be -amber-500 (#f59e0b)
//       </div>
//     </div>
//   );
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await API.get('/movies');
      setMovies(response.data);
    } catch (error) {
      toast.error('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-amber-500">MovieFlix</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Your Ultimate Movie Booking Experience
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Book tickets for the latest blockbusters and enjoy a seamless cinema experience 
            with our advanced booking system.
          </p>
        </div>
      </div>

      {/* Movies Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Now Showing
        </h2>
        
        {movies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No movies available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;