import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaTicketAlt, FaChair, FaCouch } from 'react-icons/fa';

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
      if (!st) throw new Error('Show time not found');
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
    return showTime?.bookedSeats?.some(seat => seat.row === row && seat.number === number);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  // const rows = ['A', 'B', 'C', 'D', 'E'];
  // const seatsPerRow = 15;
  const seatLayout = [
    { type: 'premium', rows: ['A', 'B'], seatsPerRow: 12, priceMultiplier: 1.5 },
    { type: 'standard', rows: ['C', 'D', 'E'], seatsPerRow: 15, priceMultiplier: 1 },
    { type: 'balcony', rows: ['F', 'G'], seatsPerRow: 10, priceMultiplier: 1.2 }
  ];

  // Calculate total price with seat type consideration
  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => {
      const seatType = seatLayout.find(layout => 
        layout.rows.includes(seat.row)
      )?.type || 'standard';
      const multiplier = seatLayout.find(layout => 
        layout.rows.includes(seat.row)
      )?.priceMultiplier || 1;
      return total + (showTime.price * multiplier);
    }, 0);
  };

  // Enhanced seat rendering with different types
  const renderSeat = (row, number, isBooked, isSelected) => {
    const seatType = seatLayout.find(layout => 
      layout.rows.includes(row)
    )?.type || 'standard';

    const seatClasses = {
      premium: `w-10 h-10 rounded-t-lg ${isBooked ? 'bg-gray-400' : isSelected ? 'bg-amber-500' : 'bg-purple-600 hover:bg-purple-500'}`,
      standard: `w-8 h-8 rounded-sm ${isBooked ? 'bg-gray-400' : isSelected ? 'bg-amber-500' : 'bg-gray-700 hover:bg-gray-600'}`,
      balcony: `w-9 h-9 rounded-t-md ${isBooked ? 'bg-gray-400' : isSelected ? 'bg-amber-500' : 'bg-blue-600 hover:bg-blue-500'}`
    };

    const seatIcon = seatType === 'premium' ? <FaCouch className="text-xs" /> : <FaChair className="text-xs" />;

    return (
      <button
        key={`${row}-${number}`}
        onClick={() => !isBooked && toggleSeat(row, number)}
        disabled={isBooked}
        className={`flex items-center justify-center text-xs font-medium transition-all transform hover:scale-110 ${
          seatClasses[seatType]
        } ${
          isBooked ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        aria-label={`${row}${number} ${seatType} seat`}
      >
        {seatType === 'premium' ? seatIcon : number}
      </button>
    );
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(`/movie/${movieId}`)}
          className="flex items-center text-amber-400 hover:text-amber-300 mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Movie
        </button>

        <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Movie Info */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-2xl font-bold">{movie.title}</h2>
                <p className="text-gray-400">
                  {new Date(showTime.date).toLocaleDateString()} | {showTime.time}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-300">
                <span className="font-semibold">Selected:</span> {selectedSeats.length} seat(s)
              </p>
              <p className="text-xl font-bold text-amber-400">
                Total: ₹{selectedSeats.length * showTime.price}
              </p>
            </div>
          </div>

          {/* Seat Selection */}
          <div className="p-6">
          <h3 className="text-xl font-semibold text-center mb-8 flex items-center justify-center">
            <FaChair className="mr-2 text-amber-400" /> Select Your Seats
          </h3>
          
          {/* Enhanced Theater Screen */}
          <div className="mb-8 relative">
            <div className="h-6 bg-gradient-to-b from-gray-700 to-gray-900 mx-auto" style={{ 
              width: '90%',
              clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
            }}></div>
            <div className="h-4 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto -mt-1" style={{ 
              width: '85%',
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
            }}></div>
            <p className="text-center text-gray-400 font-medium mt-2">SCREEN</p>
          </div>

          {/* Seating Area */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            {/* Walkway */}
            <div className="h-8 mb-4 mx-auto bg-gray-700/30 rounded-full" style={{ width: '70%' }}></div>
            
            {/* Premium Seats */}
            <div className="mb-6">
              <h4 className="text-amber-400 font-medium mb-3 flex items-center">
                <FaCouch className="mr-2" /> Premium Seats (₹{(showTime.price * 1.5).toFixed(0)})
              </h4>
              {seatLayout[0].rows.map(row => (
                <div key={row} className="flex justify-center space-x-2 mb-2">
                  <span className="w-6 flex items-center justify-center font-medium text-purple-400">{row}</span>
                  {Array.from({ length: seatLayout[0].seatsPerRow }, (_, i) => i + 1).map(number => {
                    const isBooked = isSeatBooked(row, number);
                    const isSelected = isSeatSelected(row, number);
                    return renderSeat(row, number, isBooked, isSelected);
                  })}
                </div>
              ))}
            </div>

            {/* Standard Seats */}
            <div className="mb-6">
              <h4 className="text-gray-300 font-medium mb-3 flex items-center">
                <FaChair className="mr-2" /> Standard Seats (₹{showTime.price})
              </h4>
              {seatLayout[1].rows.map(row => (
                <div key={row} className="flex justify-center space-x-2 mb-2">
                  <span className="w-6 flex items-center justify-center font-medium text-gray-300">{row}</span>
                  {Array.from({ length: seatLayout[1].seatsPerRow }, (_, i) => i + 1).map(number => {
                    const isBooked = isSeatBooked(row, number);
                    const isSelected = isSeatSelected(row, number);
                    return renderSeat(row, number, isBooked, isSelected);
                  })}
                </div>
              ))}
            </div>

            {/* Balcony Seats */}
            <div className="mb-4">
              <h4 className="text-blue-400 font-medium mb-3 flex items-center">
                <FaChair className="mr-2" /> Balcony Seats (₹{(showTime.price * 1.2).toFixed(0)})
              </h4>
              {seatLayout[2].rows.map(row => (
                <div key={row} className="flex justify-center space-x-2 mb-2">
                  <span className="w-6 flex items-center justify-center font-medium text-blue-300">{row}</span>
                  {Array.from({ length: seatLayout[2].seatsPerRow }, (_, i) => i + 1).map(number => {
                    const isBooked = isSeatBooked(row, number);
                    const isSelected = isSeatSelected(row, number);
                    return renderSeat(row, number, isBooked, isSelected);
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Legend */}
          <div className="grid grid-cols-3 gap-4 mt-8 bg-gray-800/50 p-4 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-700 rounded-sm flex items-center justify-center mb-1">
                <FaChair className="text-xs" />
              </div>
              <span className="text-xs text-center text-gray-300">Standard</span>
              <span className="text-xs text-amber-400">₹{showTime.price}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-purple-600 rounded-t-lg flex items-center justify-center mb-1">
                <FaCouch className="text-xs" />
              </div>
              <span className="text-xs text-center text-gray-300">Premium</span>
              <span className="text-xs text-amber-400">₹{(showTime.price * 1.5).toFixed(0)}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 bg-blue-600 rounded-t-md flex items-center justify-center mb-1">
                <FaChair className="text-xs" />
              </div>
              <span className="text-xs text-center text-gray-300">Balcony</span>
              <span className="text-xs text-amber-400">₹{(showTime.price * 1.2).toFixed(0)}</span>
            </div>
            <div className="flex flex-col items-center col-span-3">
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-400 rounded-sm mr-2"></div>
                  <span className="text-xs text-gray-300">Booked</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-500 rounded-sm mr-2"></div>
                  <span className="text-xs text-gray-300">Selected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Updated to show detailed total */}
        <div className="p-6 bg-gray-700 border-t border-gray-600 flex justify-between items-center">
          <button
            onClick={() => navigate(`/movie/${movieId}`)}
            className="px-6 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <div className="text-right">
            <p className="text-sm text-gray-300">
              {selectedSeats.length} seat(s) selected
            </p>
            <p className="text-xl font-bold text-amber-400">
              Total: ₹{calculateTotal()}
            </p>
          </div>
          <button
            onClick={handleProceed}
            disabled={selectedSeats.length === 0}
            className={`px-6 py-2 rounded-lg flex items-center transition-colors ${
              selectedSeats.length === 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600 text-white'
            }`}
          >
            <FaTicketAlt className="mr-2" />
            Proceed to Checkout
          </button>
        </div>

        </div>
      </div>
    </div>
  );
};

export default SeatBooking;