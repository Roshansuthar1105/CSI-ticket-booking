import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import API from '../../utils/api';
import toast from 'react-hot-toast';
import { FaSearch, FaStar, FaFilm, FaTicketAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const viewmore = {};
  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const results = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(results);
  }, [searchTerm, movies]);

  const fetchMovies = async () => {
    try {
      const response = await API.get('/movies');
      setMovies(response.data.slice(0, 5));
      setFilteredMovies(response.data);
    } catch (error) {
      toast.error('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white py-20 overflow-hidden flex justify-between flex-col">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070')] bg-cover bg-center"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
            Welcome to <span className="text-amber-500">MovieFlix</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fadeIn delay-100">
            Your Ultimate Movie Booking Experience
          </p>
          {/* <div className="max-w-2xl mx-auto relative animate-fadeIn delay-200">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full px-6 py-4 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 pl-14"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div> */}
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-all duration-300">
                <FaFilm className="text-amber-500 text-3xl mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">{movies.length}+</h3>
                <p className="text-gray-300">Movies</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-all duration-300">
                <FaTicketAlt className="text-amber-500 text-3xl mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">1000+</h3>
                <p className="text-gray-300">Tickets Booked</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-all duration-300">
                <FaStar className="text-amber-500 text-3xl mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">4.8</h3>
                <p className="text-gray-300">Average Rating</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-all duration-300">
                <FaUser className="text-amber-500 text-3xl mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">500+</h3>
                <p className="text-gray-300">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Section */}
      <div className="container mx-auto px-4 py-16">

        <h2 className="text-3xl font-bold text-center mb-12 text-white relative">
          <span className="relative inline-block">
            Now <span className='text-amber-500' >Showing</span>
            {/* <span className="absolute -bottom-4 left-[10%] rounded-full w-[80%] h-1 bg-amber-500 transform -translate-y-2"></span> */}
          </span>
        </h2>
        <div className="max-w-2xl mx-auto relative animate-fadeIn delay-200 my-10 ">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full px-6 py-4 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 pl-14"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>
        {filteredMovies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No movies found matching your search.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors duration-300"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-700">
              <div className="relative overflow-hidden h-64">
                <img
                  src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="View more movies"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                  }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center p-4">
                    <FaFilm className="mx-auto text-5xl text-amber-400 mb-4" />
                    <h3 className="text-2xl font-bold text-white">Explore More</h3>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-800">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  Discover New Releases
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Browse our complete collection of movies across all genres
                </p>

                <Link
                  to="/movies"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-lg font-medium transition-all duration-300 group mt-16"
                >
                  View All Movies
                  <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;