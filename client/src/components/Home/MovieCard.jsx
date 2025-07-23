import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const getMinPrice = () => {
    if (!movie.showTimes || movie.showTimes.length === 0) return 0;
    return Math.min(...movie.showTimes.map(st => st.price));
  };

  return (
    <div className="bg-gray-600 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 group">
      <div className="relative overflow-hidden h-64">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            ⭐ {movie.rating}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-100 mb-1 group-hover:text-amber-500 transition-colors">{movie.title}</h3>
        <p className="text-amber-600 text-sm mb-2">{movie.genre}</p>
        <p className="text-gray-100 text-sm mb-3 line-clamp-2">{movie.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{movie.duration}</span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            From ₹{getMinPrice()}
          </span>
        </div>
        
        <Link
          to={`/movie/${movie._id}`}
          className="block w-full bg-amber-500 hover:bg-amber-600 text-white text-center py-2 rounded-lg text-sm font-medium transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;