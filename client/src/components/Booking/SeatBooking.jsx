import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';
import toast from 'react-hot-toast';

const SeatBooking = () => {
  const { id: movieId, showTimeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [showTime, setShowTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to book tickets');
      navigate('/login');
      return;
    }

    fetchMovie();
  }, [movieId, showTimeId]);

  const fetchMovie = async () => {
    try {
      const response = await API.get(`/movies/${movieId}`);
      setMovie(response.data);
      const st = response.data.showTimes.find(st => st._id.toString() === showTimeId);
      if (!st) {
        throw new Error('Show time not found');
      }
      setShowTime(st);
    } catch (error) {
      toast.error(error.message);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const toggleSeat = (row, number) => {
    const seat = { row, number };
    const isSelected = selectedSeats.some(s => s.row === row && s.number === number);
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => !(s.row === row && s.number === number)));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const isSeatBooked = (row, number) => {
    return showTime.bookedSeats.some(seat => seat.row === row && seat.number === number);
  };

  const isSeatSelected = (row, number) => {
    return selectedSeats.some(seat => seat.row === row && seat.number === number);
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }
    navigate(`/checkout/${movieId}/${showTimeId}`, {
      state: {
        movie,
        showTime,
        selectedSeats,
        totalAmount: selectedSeats.length * showTime.price
      }
    });
  };

  if (loading || !movie || !showTime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-secondary"></div>
      </div>
    );
  }

  // Generate seat layout (5 rows A-E, 10 seats per row)
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 10;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Movie Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{movie.title}</h2>
                <p className="text-gray-600">
                  {new Date(showTime.date).toLocaleDateString()} | {showTime.time}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-700">
                <span className="font-semibold">Selected:</span> {selectedSeats.length} seat(s)
              </p>
              <p className="text-xl font-bold text-secondary">
                Total: ₹{selectedSeats.length * showTime.price}
              </p>
            </div>
          </div>

          {/* Seat Selection */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-center mb-8">Select Your Seats</h3>
            
            {/* Screen */}
            <div className="mb-8">
              <div className="h-4 bg-gray-300 rounded-t-full mx-auto mb-2" style={{ width: '80%' }}></div>
              <p className="text-center text-gray-600 font-medium">SCREEN</p>
            </div>

            {/* Seats */}
            <div className="space-y-4">
              {rows.map(row => (
                <div key={row} className="flex justify-center space-x-2">
                  <span className="w-6 flex items-center justify-center font-medium">{row}</span>
                  {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map(number => {
                    const isBooked = isSeatBooked(row, number);
                    const isSelected = isSeatSelected(row, number);
                    
                    return (
                      <button
                        key={`${row}-${number}`}
                        onClick={() => !isBooked && toggleSeat(row, number)}
                        disabled={isBooked}
                        className={`w-8 h-8 rounded-sm flex items-center justify-center text-xs font-medium
                          ${isBooked ? 'bg-gray-300 cursor-not-allowed' : 
                            isSelected ? 'bg-secondary text-white' : 
                            'bg-gray-100 hover:bg-gray-200'}`}
                      >
                        {number}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-6 mt-8">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-100 rounded-sm mr-2"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-secondary rounded-sm mr-2"></div>
                <span className="text-sm">Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 rounded-sm mr-2"></div>
                <span className="text-sm">Booked</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={() => navigate(`/movie/${movieId}`)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              onClick={handleProceed}
              disabled={selectedSeats.length === 0}
              className="px-6 py-2 bg-secondary hover:bg-yellow-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatBooking;