import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaSave, FaHistory, FaHeart, FaStar } from 'react-icons/fa';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('activity');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data.user);
        setEditData({
          name: response.data.user.name,
          phone: response.data.user.phone || ''
        });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        '/api/auth/me',
        { name: editData.name, phone: editData.phone },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setUser(response.data.user);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your <span className="text-amber-500">Profile</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Manage your account and view your activity
          </p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-gray-800 rounded-xl p-6 mb-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                  <FaUser className="text-5xl text-gray-400" />
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white text-center text-xl font-semibold mb-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                ) : (
                  <h2 className="text-2xl font-semibold text-center">{user.name}</h2>
                )}
                <p className="text-gray-400">{user.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-gray-400 mr-3" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={editData.phone}
                      onChange={handleChange}
                      placeholder="Add phone number"
                      className="flex-grow px-3 py-1 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  ) : (
                    <span>{user.phone || 'Not provided'}</span>
                  )}
                </div>
              </div>

              <div className="mt-6">
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="w-full flex items-center justify-center px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
                  >
                    <FaSave className="mr-2" /> Save Changes
                  </button>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <FaEdit className="mr-2" /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            {/* Tabs */}
            <div className="bg-gray-800 rounded-xl p-1 mb-6">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`flex-1 py-3 px-4 rounded-lg text-center transition-colors ${activeTab === 'activity' ? 'bg-gray-700 text-amber-400' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <FaHistory className="inline-block mr-2" /> Activity
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`flex-1 py-3 px-4 rounded-lg text-center transition-colors ${activeTab === 'favorites' ? 'bg-gray-700 text-amber-400' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <FaHeart className="inline-block mr-2" /> Favorites
                </button>
                <button
                  onClick={() => setActiveTab('ratings')}
                  className={`flex-1 py-3 px-4 rounded-lg text-center transition-colors ${activeTab === 'ratings' ? 'bg-gray-700 text-amber-400' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <FaStar className="inline-block mr-2" /> Ratings
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-gray-800 rounded-xl p-6">
              {activeTab === 'activity' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-300">You rated "Inception" 5 stars</p>
                      <p className="text-sm text-gray-500 mt-1">2 days ago</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-300">You added "The Dark Knight" to your favorites</p>
                      <p className="text-sm text-gray-500 mt-1">1 week ago</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-300">You watched "Interstellar"</p>
                      <p className="text-sm text-gray-500 mt-1">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'favorites' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Your Favorite Movies</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Placeholder for favorite movies */}
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="h-40 bg-gray-600 rounded mb-3"></div>
                      <h4 className="font-medium">The Shawshank Redemption</h4>
                      <p className="text-sm text-gray-400">Drama</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="h-40 bg-gray-600 rounded mb-3"></div>
                      <h4 className="font-medium">The Godfather</h4>
                      <p className="text-sm text-gray-400">Crime, Drama</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="h-40 bg-gray-600 rounded mb-3"></div>
                      <h4 className="font-medium">Pulp Fiction</h4>
                      <p className="text-sm text-gray-400">Crime, Drama</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ratings' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Your Rated Movies</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-700 p-4 rounded-lg flex items-start">
                      <div className="w-16 h-24 bg-gray-600 rounded mr-4"></div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Inception</h4>
                          <div className="flex items-center text-amber-400">
                            <FaStar className="mr-1" />
                            <span>5</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">Sci-Fi, Action</p>
                        <p className="text-gray-300 text-sm">"Mind-blowing concept and execution. One of Nolan's best!"</p>
                      </div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg flex items-start">
                      <div className="w-16 h-24 bg-gray-600 rounded mr-4"></div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">The Dark Knight</h4>
                          <div className="flex items-center text-amber-400">
                            <FaStar className="mr-1" />
                            <span>5</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">Action, Crime, Drama</p>
                        <p className="text-gray-300 text-sm">"Heath Ledger's Joker is legendary. Perfect superhero movie."</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;