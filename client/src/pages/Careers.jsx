import React from 'react';
import { FaBriefcase, FaUsers, FaLightbulb, FaHandshake } from 'react-icons/fa';

const Careers = () => {
  const jobOpenings = [
    {
      title: "Frontend Developer",
      type: "Full-time",
      location: "Mumbai (Remote Available)",
      department: "Engineering"
    },
    {
      title: "Customer Support Specialist",
      type: "Full-time",
      location: "Bangalore",
      department: "Customer Experience"
    },
    {
      title: "Marketing Manager",
      type: "Full-time",
      location: "Delhi",
      department: "Marketing"
    },
    {
      title: "Backend Engineer",
      type: "Contract",
      location: "Remote",
      department: "Engineering"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Join the <span className="text-amber-500">MovieFlix</span> Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Help us revolutionize the movie-going experience while building your dream career
          </p>
        </div>

        {/* Why Work With Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center relative">
            <span className="relative inline-block">
              Why <span className="text-amber-500">Work</span> With Us?             
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaBriefcase className="text-4xl mb-4 text-amber-500" />,
                title: "Exciting Projects",
                desc: "Work on cutting-edge technology that impacts millions of movie lovers"
              },
              {
                icon: <FaUsers className="text-4xl mb-4 text-amber-500" />,
                title: "Great Culture",
                desc: "Collaborative environment with passionate, creative people"
              },
              {
                icon: <FaLightbulb className="text-4xl mb-4 text-amber-500" />,
                title: "Growth Opportunities",
                desc: "Continuous learning and career advancement programs"
              },
              {
                icon: <FaHandshake className="text-4xl mb-4 text-amber-500" />,
                title: "Competitive Benefits",
                desc: "Health insurance, flexible hours, and movie perks"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 h-full">
                {item.icon}
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Openings */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center relative">
            <span className="relative inline-block">
              Current <span className="text-amber-500">Openings</span>
            </span>
          </h2>
          
          <div className="space-y-4">
            {jobOpenings.map((job, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h3 className="text-xl font-bold text-amber-400">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm">
                      <span className="bg-gray-700 px-3 py-1 rounded-full">{job.type}</span>
                      <span className="bg-gray-700 px-3 py-1 rounded-full">{job.location}</span>
                      <span className="bg-gray-700 px-3 py-1 rounded-full">{job.department}</span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition-colors duration-300">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How We Hire */}
        <div className="bg-gray-800 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Hiring Process</h2>
          
          <div className="grid md:grid-cols-5 gap-6 mt-8">
            {[
              { step: "1", title: "Application", desc: "Submit your resume and details" },
              { step: "2", title: "Screening", desc: "Initial phone/video screening" },
              { step: "3", title: "Assessment", desc: "Skills evaluation" },
              { step: "4", title: "Interviews", desc: "Meet the team" },
              { step: "5", title: "Offer", desc: "Welcome aboard!" }
            ].map((stage, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {stage.step}
                </div>
                <h3 className="font-bold mb-2">{stage.title}</h3>
                <p className="text-gray-300 text-sm">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;