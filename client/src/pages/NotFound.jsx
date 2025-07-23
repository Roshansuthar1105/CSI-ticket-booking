import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilm, FaHome, FaTicketAlt, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <FaFilm className="text-8xl text-amber-500 opacity-20" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold">
              404
            </span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Oops! <span className="text-amber-500">Page</span> Not Found
        </h1>
        
        <p className="text-xl text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back to the movies!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-all duration-300"
          >
            <Link to="/" className="flex flex-col items-center">
              <FaHome className="text-3xl text-amber-500 mb-3" />
              <span className="font-medium">Go to Homepage</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-all duration-300"
          >
            <Link to="/movies" className="flex flex-col items-center">
              <FaTicketAlt className="text-3xl text-amber-500 mb-3" />
              <span className="font-medium">Browse Movies</span>
            </Link>
          </motion.div>
        </div>

        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for movies..."
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
      </motion.div>

      <div className="mt-12 text-center text-gray-400 text-sm">
        <p>Still lost? Contact our <Link to="/contact" className="text-amber-400 hover:text-amber-300">support team</Link></p>
      </div>
    </div>
  );
};

export default NotFound;