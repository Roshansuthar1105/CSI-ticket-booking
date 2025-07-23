import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/Home/MovieCard';
import API from '../utils/api';
import toast from 'react-hot-toast';
import { FaSearch, FaStar, FaFilter, FaTimes, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    rating: '',
    year: ''
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    let results = movies;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply additional filters
    if (filters.genre) {
      results = results.filter(movie => 
        movie.genre.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }
    
    if (filters.rating) {
      results = results.filter(movie => 
        movie.rating >= parseInt(filters.rating)
      );
    }
    
    if (filters.year) {
      results = results.filter(movie => 
        new Date(movie.releaseDate).getFullYear().toString() === filters.year
      );
    }

    setFilteredMovies(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters, movies]);

  const fetchMovies = async () => {
    try {
      const response = await API.get('/movies');
      setMovies(response.data);
      setFilteredMovies(response.data);
    } catch (error) {
      toast.error('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  // Get current movies for pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate year options (last 30 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const clearFilters = () => {
    setFilters({
      genre: '',
      rating: '',
      year: ''
    });
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Browse Our <span className="text-amber-500">Movie Collection</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the latest blockbusters, timeless classics, and hidden gems
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search movies by title or genre..."
              className="w-full px-6 py-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
          >
            <FaFilter className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-800 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Genre</label>
                <select
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={filters.genre}
                  onChange={(e) => setFilters({...filters, genre: e.target.value})}
                >
                  <option value="">All Genres</option>
                  {[...new Set(movies.flatMap(movie => movie.genre.split(',').map(g => g.trim())))].map((genre, i) => (
                    <option key={i} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Minimum Rating</label>
                <select
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={filters.rating}
                  onChange={(e) => setFilters({...filters, rating: e.target.value})}
                >
                  <option value="">Any Rating</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <option key={num} value={num}>{num}+ Stars</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Release Year</label>
                <select
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={filters.year}
                  onChange={(e) => setFilters({...filters, year: e.target.value})}
                >
                  <option value="">Any Year</option>
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {(filters.genre || filters.rating || filters.year) && (
              <button
                onClick={clearFilters}
                className="mt-4 flex items-center text-amber-400 hover:text-amber-300"
              >
                <FaTimes className="mr-1" /> Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400">
            Showing {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}
          </p>
        </div>

        {/* Movies Grid */}
        {currentMovies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl mb-4">No movies found matching your criteria</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentMovies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
                  >
                    <FaArrowLeft />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`px-4 py-2 rounded-lg ${currentPage === pageNum ? 'bg-amber-500 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
                  >
                    <FaArrowRight />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Movies;