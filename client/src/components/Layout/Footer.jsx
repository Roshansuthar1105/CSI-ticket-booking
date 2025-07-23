import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
              MovieFlix
            </h3>
            <p className="text-gray-300">
              Your ultimate destination for movie ticket booking. Enjoy the best cinema experience with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Movies', href: '/movies' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'FAQ', href: '/faq' },
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-gray-300 hover:text-amber-500 transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Information</h4>
            <ul className="space-y-3">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Refund Policy', href: '/refund' },
                { name: 'Careers', href: '/careers' },
                { name: 'Blog', href: '/blog' },
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-gray-300 hover:text-amber-500 transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-amber-500 mt-1 mr-3 flex-shrink-0" />
                <p>123 Cinema Street, Mumbai, India - 400001</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-amber-500 mr-3" />
                <p>+91 1234567890</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-amber-500 mr-3" />
                <p>info@movieflix.com</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} MovieFlix. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Designed and Developed with ❤️ by Roshan Suthar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;