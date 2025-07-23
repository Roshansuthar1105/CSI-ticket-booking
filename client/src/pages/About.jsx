import React from 'react';
import { FaFilm, FaUsers, FaTicketAlt} from 'react-icons/fa';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { CgWebsite } from "react-icons/cg";
const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-amber-500">MovieFlix</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing the way you experience cinema with seamless booking and premium services.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center relative">
            <span className="relative inline-block">
              Our <span className='text-amber-500' >Story</span>
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-300 mb-4">
                Founded in 2023, MovieFlix began as a small project with a big vision - to transform movie ticket booking into a delightful experience.
              </p>
              <p className="text-gray-300 mb-4">
                What started as a simple booking platform has now grown into a comprehensive entertainment hub serving thousands of customers daily.
              </p>
              <p className="text-gray-300">
                Our team of cinema enthusiasts and tech experts work tirelessly to bring you the best features and the latest movies.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070" 
                alt="Cinema seats" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center relative">
            <span className="relative inline-block">
              Our <span className='text-amber-500' >Mission</span>
            </span>
          </h2>
          <p className="text-gray-300 text-center max-w-4xl mx-auto mb-8">
            To provide movie lovers with an effortless, enjoyable, and premium ticket booking experience that enhances their cinema-going journey.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaFilm className="text-4xl mb-4 text-amber-500" />,
                title: "Wide Selection",
                desc: "Access to all major releases and indie films across theaters"
              },
              {
                icon: <FaUsers className="text-4xl mb-4 text-amber-500" />,
                title: "Customer First",
                desc: "Dedicated support and user-friendly interface for all"
              },
              {
                icon: <FaTicketAlt className="text-4xl mb-4 text-amber-500" />,
                title: "Easy Booking",
                desc: "Quick and secure ticket purchases in just a few clicks"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300">
                {item.icon}
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center relative group">
          <span className="relative inline-block">
            Meet The <span className='text-amber-500'>Developer</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 transform -translate-y-1 scale-x-75 group-hover:scale-x-100 transition-transform duration-300"></span>
          </span>
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {[
            {
              name: "Roshan Suthar",
              role: "Founder & CEO",
              img: "https://media.licdn.com/dms/image/v2/D4D03AQFRLMK-sgnCWg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722561339257?e=2147483647&v=beta&t=fKbtOqDdelHcrWBdi9tQ4GqG5ONIHW4B8uT12QhDiCg",
              social: {
                linkedin: "https://www.linkedin.com/in/roshansuthar",
                portfolio: "https://roshansuthar.netlify.app/",
                github: "https://github.com/roshansuthar1105"
              }
            }
          ].map((member, index) => (
            <div 
              key={index} 
              className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden h-72">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                <p className="text-amber-500 mb-4">{member.role}</p>
                <div className="flex space-x-4">
                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin} 
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a 
                      href={member.social.twitter} 
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                      aria-label="Twitter"
                    >
                      <FaTwitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.portfolio && (
                    <a 
                      href={member.social.portfolio} 
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                      aria-label="Portfolio"
                    >
                      <CgWebsite className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a 
                      href={member.social.github} 
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                      aria-label="GitHub"
                    >
                      <FaGithub className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default About;