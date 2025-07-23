import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaBars, FaTimes, FaUser, FaTicketAlt, FaReceipt, FaHome, FaFilm, FaInfoCircle, FaQuestionCircle, FaPhone } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollPositionRef=useRef(0);
  // Handle scroll locking
  useEffect(() => {
    const handleScrollLock = () => {
      if (isMobileMenuOpen) {
        // Save current scroll position
        scrollPositionRef.current = window.scrollY;
        
        // Lock scrolling
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollPositionRef.current}px`;
      } else {
        // Unlock scrolling
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollPositionRef.current);
      }
    };

    handleScrollLock();

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMobileMenuOpen]);
  // useEffect(() => {
  //   if (isMobileMenuOpen) {
  //     document.body.classList.add('no-scroll');
  //   } else {
  //     document.body.classList.remove('no-scroll');
  //   }

  //   // Cleanup function
  //   return () => {
  //     document.body.classList.remove('no-scroll');
  //   };
  // }, [isMobileMenuOpen]);
  // const handleLogout = () => {
  //   logout();
  //   navigate('/');
  //   setIsMobileMenuOpen(false);
  //   setIsProfileMenuOpen(false);
  // };
  const handleLogout = () => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
        bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg`}>
        <div className="flex flex-col space-y-3">
          <p className="text-white font-medium">Are you sure you want to logout?</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                logout();
                navigate('/');
                setIsMobileMenuOpen(false);
                setIsProfileMenuOpen(false);
              }}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    ), {
      duration: Infinity, // Toast won't auto-close
      position: 'top-center',
    });
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileMenuOpen(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // For mobile menu
      if (isMobileMenuOpen && 
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) &&
          mobileMenuButtonRef.current &&
          !mobileMenuButtonRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      
      // For profile menu
      if (isProfileMenuOpen && 
          profileMenuRef.current && 
          !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen, isProfileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Common styles
  const navLinkStyle = "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-all duration-300 font-medium";
  const buttonStyle = "px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium";

  return (
    <>
     {/* <Toaster 
        toastOptions={{
          className: '',
          style: {
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
          },
        }} 
      /> */}
    
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-xl' : 'bg-gray-900'} border-b-2 border-amber-500/80 `}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent hover:from-amber-400 hover:to-yellow-300 transition-all duration-300 flex items-center"
          >
            <span className="hidden sm:inline">Movie</span>Flix
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`${navLinkStyle} ${location.pathname === '/' ? 'text-amber-400' : 'text-white'}`}>
              <FaHome className="text-lg" />
              <span>Home</span>
            </Link>
            
            <Link to="/movies" className={`${navLinkStyle} ${location.pathname === '/movies' ? 'text-amber-400' : 'text-white'}`}>
              <FaFilm className="text-lg" />
              <span>Movies</span>
            </Link>
            
            <Link to="/about" className={`${navLinkStyle} ${location.pathname === '/about' ? 'text-amber-400' : 'text-white'}`}>
              <FaInfoCircle className="text-lg" />
              <span>About</span>
            </Link>
            
            <Link to="/contact" className={`${navLinkStyle} ${location.pathname === '/contact' ? 'text-amber-400' : 'text-white'}`}>
              <FaPhone className="text-lg" />
              <span>Contact</span>
            </Link>
            
            {user && (
              <Link to="/my-bookings" className={`${navLinkStyle} ${location.pathname === '/my-bookings' ? 'text-amber-400' : 'text-white'}`}>
                <FaTicketAlt className="text-lg" />
                <span>Bookings</span>
              </Link>
            )}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button 
                  className="flex items-center space-x-2 focus:outline-none cursor-pointer "
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  aria-label="Profile menu"
                  aria-expanded={isProfileMenuOpen}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center text-white">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <MdAccountCircle className="text-xl" />
                    )}
                  </div>
                  <span className="text-sm font-medium hidden lg:inline text-white">Hi, {user.name.split(' ')[0]}</span>
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-1 z-50 border border-gray-700">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/my-receipts"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      My Receipts
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className={`${buttonStyle} bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`${buttonStyle} border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            ref={mobileMenuButtonRef}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 focus:outline-none transition-all relative z-50"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl text-amber-400" />
            ) : (
              <FaBars className="text-2xl text-amber-400" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          ref={mobileMenuRef}
          className={`md:hidden fixed inset-0 z-[1000] transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        >
          {/* Overlay */}
          <div 
            className={`absolute inset-0 bg-black/80 transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className={`absolute top-0 right-0 w-72 h-full bg-gray-800 shadow-2xl overflow-y-auto transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} border-l-2 border-amber-500/80`}>
            <div className="p-4 pt-16">
              {user && (
                <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-700/50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center text-white">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <MdAccountCircle className="text-xl" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-xs text-gray-300">{user.email}</p>
                  </div>
                </div>
              )}
              
              <nav className="space-y-1 mb-4">
                <Link 
                  to="/" 
                  className={`${navLinkStyle} ${location.pathname === '/' ? 'text-amber-400 bg-gray-700/50' : 'text-white'}`}
                >
                  <FaHome />
                  <span>Home</span>
                </Link>
                
                <Link 
                  to="/movies" 
                  className={`${navLinkStyle} ${location.pathname === '/movies' ? 'text-amber-400 bg-gray-700/50' : 'text-white'}`}
                >
                  <FaFilm />
                  <span>Movies</span>
                </Link>
                
                {user && (
                  <>
                    <Link 
                      to="/my-bookings" 
                      className={`${navLinkStyle} ${location.pathname === '/my-bookings' ? 'text-amber-400 bg-gray-700/50' : 'text-white'}`}
                    >
                      <FaTicketAlt />
                      <span>My Bookings</span>
                    </Link>
                    <Link 
                      to="/my-receipts" 
                      className={`${navLinkStyle} ${location.pathname === '/my-receipts' ? 'text-amber-400 bg-gray-700/50' : 'text-white'}`}
                    >
                      <FaReceipt />
                      <span>My Receipts</span>
                    </Link>
                    <Link 
                      to="/profile" 
                      className={`${navLinkStyle} ${location.pathname === '/profile' ? 'text-amber-400 bg-gray-700/50' : 'text-white'}`}
                    >
                      <FaUser />
                      <span>My Profile</span>
                    </Link>
                  </>
                )}
                
                <Link 
                  to="/about" 
                  className={`${navLinkStyle} ${location.pathname === '/about' ? 'text-amber-400 bg-gray-700/50' : 'text-white'}`}
                >
                  <FaInfoCircle />
                  <span>About</span>
                </Link>
                
                <Link 
                  to="/contact" 
                  className={`${navLinkStyle} ${location.pathname === '/contact' ? 'text-amber-400 bg-gray-700/50' : 'text-white'}`}
                >
                  <FaPhone />
                  <span>Contact</span>
                </Link>
                
                <Link 
                  to="/faq" 
                  className={`${navLinkStyle} ${location.pathname === '/faq' ? 'text-amber-400 bg-gray-700/50' : 'text-white'}`}
                >
                  <FaQuestionCircle />
                  <span>FAQ</span>
                </Link>
              </nav>

              <div className="pt-3 border-t border-gray-700">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className={`${buttonStyle} w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white`}
                  >
                    Logout
                  </button>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className={`${buttonStyle} block text-center bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white`}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className={`${buttonStyle} block text-center border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white`}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;