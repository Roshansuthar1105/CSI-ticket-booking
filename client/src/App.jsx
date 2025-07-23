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
import Movies from './pages/Movies';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import FAQ from './pages/FAQ';
import Refund from './pages/RefundPolicy';
import Career from './pages/Careers';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';
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
              <Route path="/movies" element={<Movies />} />
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
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/refund" element={<Refund />} />
              <Route path="/careers" element={<Career />} />
              <Route path="/blog" element={<Blog />} />
              {/* 404 page for unknown pages  */}
              <Route path="*" element={<NotFound />} />
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