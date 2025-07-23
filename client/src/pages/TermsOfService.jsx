import React from 'react';
import { FaBook, FaGavel, FaExclamationTriangle, FaTicketAlt } from 'react-icons/fa';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Terms of <span className="text-amber-500">Service</span>
          </h1>
          <p className="text-xl text-gray-300">
            Last Updated: January 1, 2024
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-12 bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-300">
            Welcome to MovieFlix! These Terms of Service ("Terms") govern your access to and use of our website and services. By accessing or using our services, you agree to be bound by these Terms.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {[
            {
              icon: <FaBook className="text-amber-500" />,
              title: "1. Account Registration",
              content: "You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
            },
            {
              icon: <FaTicketAlt className="text-amber-500" />,
              title: "2. Ticket Purchases",
              content: "All ticket sales are final. Refunds or exchanges may be available at the theater's discretion. We are not responsible for any changes to movie schedules made by theaters."
            },
            {
              icon: <FaGavel className="text-amber-500" />,
              title: "3. User Conduct",
              content: "You agree not to use our services for any unlawful purpose or in any way that might harm, damage, or disparage any other party. Prohibited activities include fraud, harassment, and unauthorized access."
            },
            {
              icon: <FaExclamationTriangle className="text-amber-500" />,
              title: "4. Limitation of Liability",
              content: "MovieFlix shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of or inability to use our services."
            },
            {
              title: "5. Intellectual Property",
              content: "All content on our platform, including text, graphics, logos, and software, is the property of MovieFlix or its licensors and is protected by copyright and other intellectual property laws."
            },
            {
              title: "6. Changes to Terms",
              content: "We reserve the right to modify these Terms at any time. Your continued use of our services after such changes constitutes your acceptance of the new Terms."
            },
            {
              title: "7. Governing Law",
              content: "These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions."
            }
          ].map((term, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-start mb-3">
                {term.icon && <span className="mr-3 mt-1">{term.icon}</span>}
                <h2 className="text-xl font-bold">{term.title}</h2>
              </div>
              <p className="text-gray-300 pl-9">{term.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;