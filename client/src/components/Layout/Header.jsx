import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaBars, FaTimes, FaUser, FaTicketAlt, FaReceipt, FaHome, FaFilm, FaInfoCircle, FaQuestionCircle, FaPhone } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Common link style
  const navLinkStyle = "hover:text-amber-400 transition-colors duration-300 font-medium relative group flex items-center gap-2";
  const underlineStyle = "absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300";

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent hover:from-amber-400 hover:to-yellow-300 transition-all duration-300"
          >
            MovieFlix
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={navLinkStyle}>
              <FaHome className="text-base" />
              Home
              <span className={underlineStyle}></span>
            </Link>
            
            <Link to="/movies" className={navLinkStyle}>
              <FaFilm className="text-base" />
              Movies
              <span className={underlineStyle}></span>
            </Link>
            
            <Link to="/about" className={navLinkStyle}>
              <FaInfoCircle className="text-base" />
              About
              <span className={underlineStyle}></span>
            </Link>
            
            <Link to="/contact" className={navLinkStyle}>
              <FaPhone className="text-base" />
              Contact
              <span className={underlineStyle}></span>
            </Link>
            
            {user && (
              <>
                <Link to="/my-bookings" className={navLinkStyle}>
                  <FaTicketAlt className="text-base" />
                  Bookings
                  <span className={underlineStyle}></span>
                </Link>
                <Link to="/my-receipts" className={navLinkStyle}>
                  <FaReceipt className="text-base" />
                  Receipts
                  <span className={underlineStyle}></span>
                </Link>
              </>
            )}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <span className="text-sm font-medium">Hi, {user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border border-amber-500 hover:bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-amber-400 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800 rounded-lg mt-3 p-4 shadow-xl">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <FaHome />
                Home
              </Link>
              
              <Link to="/movies" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <FaFilm />
                Movies
              </Link>
              
              <Link to="/about" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <FaInfoCircle />
                About
              </Link>
              
              <Link to="/contact" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <FaPhone />
                Contact
              </Link>
              
              {user && (
                <>
                  <Link to="/my-bookings" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                    <FaTicketAlt />
                    My Bookings
                  </Link>
                  <Link to="/my-receipts" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                    <FaReceipt />
                    My Receipts
                  </Link>
                </>
              )}
              
              <Link to="/faq" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <FaQuestionCircle />
                FAQ
              </Link>
            </nav>

            <div className="mt-4 pt-4 border-t border-gray-700">
              {user ? (
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                      <FaUser className="text-white text-xs" />
                    </div>
                    <span>Hi, {user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/login"
                    className="text-center bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-center border border-amber-500 hover:bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;