import React from 'react';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Cinema: Trends to Watch in 2024",
      excerpt: "Explore the emerging technologies and trends that are shaping the future of movie theaters and streaming platforms.",
      date: "January 15, 2024",
      author: "Roshan Suthar",
      category: "Industry Trends",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070"
    },
    {
      id: 2,
      title: "How We Built MovieFlix: A Technical Deep Dive",
      excerpt: "Learn about the architecture and technologies powering our ticket booking platform from our engineering team.",
      date: "December 5, 2023",
      author: "Priya Patel",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070"
    },
    {
      id: 3,
      title: "The Psychology Behind Movie Theater Design",
      excerpt: "Discover how theater architecture and seating arrangements affect your movie-watching experience.",
      date: "November 22, 2023",
      author: "Amit Sharma",
      category: "Design",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925"
    },
    {
      id: 4,
      title: "Interview with Award-Winning Director Anjali Mehta",
      excerpt: "An exclusive conversation about her creative process and upcoming projects.",
      date: "October 30, 2023",
      author: "Neha Gupta",
      category: "Interviews",
      image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1887"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            MovieFlix <span className="text-amber-500">Blog</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights, stories, and updates about movies, technology, and the cinema experience
          </p>
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 relative">
            <span className="relative inline-block">
              Latest <span className="text-amber-500">Articles <FaArrowRight className='inline-block'/></span>
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3 text-sm text-gray-400">
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      {post.date}
                    </span>
                    <span className="bg-gray-700 bg-opacity-20 text-amber-500 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-justify">{post.title}</h3>
                  <p className="text-gray-300 mb-4 text-justify">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center text-sm text-gray-400">
                      <FaUser className="mr-2" />
                      By {post.author}
                    </span>
                    <button className="text-amber-500 hover:text-amber-400 flex items-center">
                      Read More <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 relative">
            <span className="relative inline-block">
              Browse by <span className="text-amber-500">Category</span>
              
            </span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Industry Trends", "Technology", "Interviews", "Reviews", "Behind the Scenes", "Customer Stories", "Events", "Announcements"].map((category, index) => (
              <button 
                key={index}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors duration-300 text-center"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest articles, movie recommendations, and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-lg transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;