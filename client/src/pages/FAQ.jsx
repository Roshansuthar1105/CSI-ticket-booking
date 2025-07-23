import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I book tickets on MovieFlix?",
      answer: "Booking tickets is easy! Just select the movie you want to watch, choose your preferred showtime, select your seats, and proceed to payment. You'll receive a confirmation email with your e-ticket."
    },
    {
      question: "Can I cancel or refund my tickets?",
      answer: "Ticket cancellations and refunds are subject to the theater's policy. Most theaters allow cancellations up to 1 hour before the showtime. Please check the specific theater's policy during booking."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, net banking, UPI, and popular digital wallets like Paytm, PhonePe, and Google Pay through our secure payment gateway."
    },
    {
      question: "How do I receive my tickets?",
      answer: "After successful payment, you'll receive an email with your e-ticket. You can also view your tickets in the 'My Bookings' section of your account. Present the QR code at the theater for entry."
    },
    {
      question: "Is there a booking fee?",
      answer: "We charge a nominal convenience fee per ticket to maintain our platform. This fee is clearly displayed before you complete your booking."
    },
    {
      question: "What if I don't receive my ticket confirmation?",
      answer: "First, please check your spam folder. If you still can't find it, visit the 'My Bookings' section in your account or contact our customer support with your booking reference number."
    },
    {
      question: "Can I book tickets for someone else?",
      answer: "Yes, you can book tickets for others. Just make sure to enter the correct attendee details if required by the theater."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our 24/7 customer support via email at support@movieflix.com or by calling +91 1234567890. We also offer live chat support through our app."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Frequently Asked <span className="text-amber-500">Questions</span>
          </h1>
          <p className="text-xl text-gray-300">
            Find answers to common questions about our services
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center">
                  <FaQuestionCircle className="text-amber-500 mr-4 text-xl" />
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                </div>
                {activeIndex === index ? (
                  <FaChevronUp className="text-amber-500" />
                ) : (
                  <FaChevronDown className="text-amber-500" />
                )}
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-6 pt-2 bg-gray-700">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-16 bg-gray-800 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
          <p className="text-gray-300 mb-6">
            Can't find the answer you're looking for? Our support team is ready to assist you.
          </p>
          <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;