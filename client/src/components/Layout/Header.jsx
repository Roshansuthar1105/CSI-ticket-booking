import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-800 bg-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-amber-500">
            MovieFlix
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-amber-500 transition-colors">
              Home
            </Link>
            {user && (
              <>
                <Link to="/my-bookings" className="hover:text-amber-500 transition-colors">
                  My Bookings
                </Link>
                <Link to="/my-receipts" className="hover:text-amber-500 transition-colors">
                  My Receipts
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-amber-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="bg-amber-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border border-amber-500 hover:bg-amber-500 text-amber-500 hover:text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;