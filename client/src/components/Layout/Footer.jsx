import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-amber-500 mb-4">MovieFlix</h3>
            <p className="text-gray-300">
              Your ultimate destination for movie ticket booking. 
              Enjoy the best cinema experience with us.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-amber-500">About Us</a></li>
              <li><a href="#" className="hover:text-amber-500">Contact</a></li>
              <li><a href="#" className="hover:text-amber-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-500">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="text-gray-300 space-y-2">
              <p>Email: info@movieflix.com</p>
              <p>Phone: +91 1234567890</p>
              <p>Address: 123 Cinema Street, Mumbai, India</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MovieFlix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;