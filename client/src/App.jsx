import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MovieDetails from './components/Movie/MovieDetails';
import SeatBooking from './components/Booking/SeatBooking';
import Checkout from './components/Booking/Checkout';
import Receipt from './components/Receipt/Receipt';
import MyBookings from './components/Booking/MyBookings';
import MyReceipts from './components/Receipt/MyReceipts';
import About from './pages/About';
import Contact from './pages/Contact';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/booking/:id/:showTimeId" element={<SeatBooking />} />
              <Route path="/checkout/:id/:showTimeId" element={<Checkout />} />
              <Route path="/receipt/:id" element={<Receipt />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/my-receipts" element={<MyReceipts />} />
              {/* Other pages */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;