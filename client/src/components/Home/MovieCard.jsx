import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{movie.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{movie.genre}</p>
        <p className="text-gray-700 text-sm mb-3 line-clamp-3">{movie.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-500">Duration: {movie.duration}</span>
          <span className="bg-accent text-white px-2 py-1 rounded text-sm">
            ⭐ {movie.rating}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-secondary font-semibold">
            From ₹{Math.min(...movie.showTimes.map(st => st.price))}
          </span>
          <Link
            to={`/movie/${movie._id}`}
            className="bg-secondary hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;