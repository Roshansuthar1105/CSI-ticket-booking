import React from 'react';
import { FaShieldAlt, FaLock, FaUserShield } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Privacy <span className="text-amber-500">Policy</span>
          </h1>
          <p className="text-xl text-gray-300">
            Last Updated: January 1, 2024
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-12">
          <p className="text-gray-300 mb-6">
            At MovieFlix, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-12">
          {[
            {
              icon: <FaShieldAlt className="text-amber-500 text-3xl mb-4" />,
              title: "Information We Collect",
              content: (
                <>
                  <p className="text-gray-300 mb-4">
                    We may collect personal information that you voluntarily provide to us when you register, make a booking, or contact us. This may include:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>Name and contact details (email, phone number)</li>
                    <li>Payment information (processed securely by our payment partners)</li>
                    <li>Booking history and preferences</li>
                    <li>Device and usage information</li>
                  </ul>
                </>
              )
            },
            {
              icon: <FaLock className="text-amber-500 text-3xl mb-4" />,
              title: "How We Use Your Information",
              content: (
                <>
                  <p className="text-gray-300 mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>Provide and maintain our services</li>
                    <li>Process transactions and send booking confirmations</li>
                    <li>Improve user experience and develop new features</li>
                    <li>Communicate with you about updates and offers</li>
                    <li>Ensure security and prevent fraud</li>
                  </ul>
                </>
              )
            },
            {
              icon: <FaUserShield className="text-amber-500 text-3xl mb-4" />,
              title: "Data Security",
              content: (
                <p className="text-gray-300">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology.
                </p>
              )
            },
            {
              title: "Third-Party Services",
              content: (
                <p className="text-gray-300">
                  We may employ third-party companies and individuals to facilitate our services, provide services on our behalf, or assist us in analyzing how our services are used. These third parties have access to your personal information only to perform these tasks and are obligated not to disclose or use it for any other purpose.
                </p>
              )
            },
            {
              title: "Changes to This Policy",
              content: (
                <p className="text-gray-300">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              )
            },
            {
              title: "Contact Us",
              content: (
                <p className="text-gray-300">
                  If you have any questions about this Privacy Policy, please contact us at privacy@movieflix.com.
                </p>
              )
            }
          ].map((section, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              {section.icon && (
                <div className="flex items-center mb-4">
                  {section.icon}
                  <h2 className="text-2xl font-bold ml-3">{section.title}</h2>
                </div>
              )}
              {!section.icon && (
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              )}
              {section.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;