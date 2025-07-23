import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaBars, FaTimes, FaUser, FaTicketAlt, FaReceipt } from 'react-icons/fa';

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
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="hover:text-amber-400 transition-colors duration-300 font-medium relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {user && (
              <>
                <Link 
                  to="/my-bookings" 
                  className="hover:text-amber-400 transition-colors duration-300 font-medium relative group flex items-center gap-1"
                >
                  <FaTicketAlt className="text-sm" />
                  My Bookings
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link 
                  to="/my-receipts" 
                  className="hover:text-amber-400 transition-colors duration-300 font-medium relative group flex items-center gap-1"
                >
                  <FaReceipt className="text-sm" />
                  My Receipts
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
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
          <div className="md:hidden bg-gray-800 rounded-lg mt-3 p-4 shadow-xl animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="hover:text-amber-400 transition-colors duration-300 py-2 border-b border-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {user && (
                <>
                  <Link 
                    to="/my-bookings" 
                    className="hover:text-amber-400 transition-colors duration-300 py-2 border-b border-gray-700 flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaTicketAlt />
                    My Bookings
                  </Link>
                  <Link 
                    to="/my-receipts" 
                    className="hover:text-amber-400 transition-colors duration-300 py-2 border-b border-gray-700 flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaReceipt />
                    My Receipts
                  </Link>
                </>
              )}
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