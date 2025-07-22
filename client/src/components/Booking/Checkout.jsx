import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { id: movieId, showTimeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { movie, showTime, selectedSeats, totalAmount } = location.state || {};

  useEffect(() => {
    if (!user) {
      toast.error('Please login to book tickets');
      navigate('/login');
      return;
    }

    if (!movie || !showTime || !selectedSeats || !totalAmount) {
      toast.error('Invalid booking details');
      navigate('/');
      return;
    }

    createOrder();
  }, []);

  const createOrder = async () => {
    setLoading(true);
    try {
      const response = await API.post('/bookings/create-order', {
        movieId,
        showTimeId,
        seats: selectedSeats,
        totalAmount
      });
      setOrder(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking');
      navigate(`/movie/${movieId}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount * 100,
      currency: 'INR',
      name: 'MovieFlix',
      description: `Booking for ${movie.title}`,
      image: movie.image,
      order_id: order.orderId,
      handler: async (response) => {
        try {
          const verifyResponse = await API.post('/bookings/verify-payment', {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            bookingId: order.bookingId
          });
          
          toast.success('Payment successful!');
          setPaymentSuccess(true);
          navigate(`/receipt/${verifyResponse.data.receipt._id}`);
        } catch (error) {
          toast.error('Payment verification failed');
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone
      },
      theme: {
        color: '#F59E0B'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your booking is confirmed.</p>
          <button
            onClick={() => navigate('/my-bookings')}
            className="bg-amber-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
          >
            View My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Booking Summary */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Movie Details</h3>
                <div className="flex space-x-4">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{movie.title}</p>
                    <p className="text-gray-600 text-sm">
                      {new Date(showTime.date).toLocaleDateString()} | {showTime.time}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Seat Details</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((seat, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {seat.row}{seat.number}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-medium">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-700">Convenience Fee:</span>
                <span className="font-medium">₹0</span>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <span className="text-lg font-bold">Total Amount:</span>
                <span className="text-xl font-bold text-amber-500">₹{totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Payment Options</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-amber-500">
                <input
                  type="radio"
                  id="razorpay"
                  name="payment"
                  className="h-5 w-5 text-amber-500 focus:ring-amber-500"
                  defaultChecked
                />
                <label htmlFor="razorpay" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Razorpay</p>
                      <p className="text-sm text-gray-600">Pay using UPI, Credit/Debit Card, Net Banking</p>
                    </div>
                    <img
                      src="https://razorpay.com/assets/razorpay-glyph.svg"
                      alt="Razorpay"
                      className="h-8"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={() => navigate(`/booking/${movieId}/${showTimeId}`)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              onClick={handlePayment}
              className="px-6 py-2 bg-amber-500 hover:bg-yellow-600 text-white rounded-lg"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;