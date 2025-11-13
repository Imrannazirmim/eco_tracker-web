import React, { useState, useEffect, useContext } from 'react';
import { Calendar, Users, TrendingUp, Filter, Search, Plus, X, Droplet, Leaf, Recycle, Zap } from 'lucide-react';
import { AuthContext } from '../Contexts/RootContext';
import useAxios from '../Hooks/useAxios';
import useAxiosSecure from '../Hooks/useAxiosSecure';


const Challenges = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();

  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  
  const [filters, setFilters] = useState({
    category: 'All Categories',
    dateRange: 'all',
    participants: 'all',
    search: ''
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'Waste Reduction',
    secondaryTag: '',
    startDate: '',
    endDate: '',
    difficulty: 'Beginner',
    participants: 0
  });

  const categories = [
    'All Categories',
    'Waste Reduction',
    'Water Conservation',
    'Energy Saving',
    'Sustainable Living',
    'Plastic Free',
    'Community Cleanup',
    'Food & Agriculture'
  ];

  const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    fetchChallenges();
  }, []);

  useEffect(() => {
    filterChallenges();
    setCurrentPage(1);
  }, [challenges, filters]);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/challenges');
      setChallenges(response.data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterChallenges = () => {
    let filtered = [...challenges];

    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(c => c.category === filters.category);
    }

    if (filters.search) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.dateRange !== 'all') {
      filtered = filtered.filter(c => {
        const days = calculateDuration(c.startDate, c.endDate);
        if (filters.dateRange === 'week') return days <= 7;
        if (filters.dateRange === 'month') return days <= 30;
        if (filters.dateRange === '3months') return days <= 90;
        return true;
      });
    }

    if (filters.participants !== 'all') {
      filtered = filtered.filter(c => {
        if (filters.participants === 'small') return c.participants < 100;
        if (filters.participants === 'medium') return c.participants >= 100 && c.participants < 500;
        if (filters.participants === 'large') return c.participants >= 500;
        return true;
      });
    }

    setFilteredChallenges(filtered);
  };

  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleCreateChallenge = async () => {
    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await axiosSecure.post('/api/challenges', formData);
      setShowCreateModal(false);
      resetForm();
      fetchChallenges();
      alert('Challenge created successfully!');
    } catch (error) {
      console.error('Error creating challenge:', error);
      alert('Failed to create challenge');
    }
  };

  const handleJoinChallenge = async (challengeId) => {
    try {
      await axiosSecure.post(`/api/challenges/join/${challengeId}`);
      fetchChallenges();
      alert('Successfully joined the challenge!');
    } catch (error) {
      console.error('Error joining challenge:', error);
      alert(error.response?.data?.message || 'Failed to join challenge');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      category: 'Waste Reduction',
      secondaryTag: '',
      startDate: '',
      endDate: '',
      difficulty: 'Beginner',
      participants: 0
    });
  };

  const resetFilters = () => {
    setFilters({
      category: 'All Categories',
      dateRange: 'all',
      participants: 'all',
      search: ''
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Waste Reduction': 'bg-green-100 text-green-700',
      'Water Conservation': 'bg-blue-100 text-blue-700',
      'Energy Saving': 'bg-yellow-100 text-yellow-700',
      'Sustainable Living': 'bg-purple-100 text-purple-700',
      'Plastic Free': 'bg-teal-100 text-teal-700',
      'Community Cleanup': 'bg-orange-100 text-orange-700',
      'Food & Agriculture': 'bg-lime-100 text-lime-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredChallenges.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentChallenges = filteredChallenges.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
            currentPage === i
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        {currentPage > 1 && (
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="w-10 h-10 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition-colors"
          >
            ←
          </button>
        )}
        {pages}
        {currentPage < totalPages && (
          <button
            onClick={() => goToPage(currentPage + 1)}
            className="w-10 h-10 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition-colors"
          >
            →
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Discover Your Next Challenge
          </h1>
          <p className="text-gray-600 mb-8">
            Find and join meaningful challenges to achieve a better way of living
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search challenges..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Main Layout Container */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Sidebar - Filters */}
          <div className="lg:w-72 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6 sticky top-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 text-lg">Filters</h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Reset
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challenge Date Range
                </label>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="dateRange"
                      value="all"
                      checked={filters.dateRange === 'all'}
                      onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                      className="mr-2 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">All Durations</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="dateRange"
                      value="week"
                      checked={filters.dateRange === 'week'}
                      onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                      className="mr-2 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Up to 1 week</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="dateRange"
                      value="month"
                      checked={filters.dateRange === 'month'}
                      onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                      className="mr-2 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Up to 1 month</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="dateRange"
                      value="3months"
                      checked={filters.dateRange === '3months'}
                      onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                      className="mr-2 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Up to 3 months</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Participants
                </label>
                <div className="relative">
                  <div className="mb-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                  </div>
                  <select
                    value={filters.participants}
                    onChange={(e) => setFilters({ ...filters, participants: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All Sizes</option>
                    <option value="small">&lt; 100 joined</option>
                    <option value="medium">100 - 500 joined</option>
                    <option value="large">500+ joined</option>
                  </select>
                </div>
              </div>

              {user && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  <Plus size={20} />
                  Apply Filters
                </button>
              )}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 min-w-0">
            {currentChallenges.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No challenges match your filters!
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or reset the filters
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentChallenges.map((challenge) => (
                    <div
                      key={challenge._id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
                    >
                      <div className="relative h-48 overflow-hidden shrink-0">
                        <img
                          src={challenge.imageUrl || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400'}
                          alt={challenge.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(challenge.category)}`}>
                            {challenge.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col grow">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 min-h-14">
                          {challenge.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 grow">
                          {challenge.description}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} className="text-green-600" />
                            <span>{calculateDuration(challenge.startDate, challenge.endDate)} days</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={16} className="text-green-600" />
                            <span>{challenge.participants || 0} joined</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleJoinChallenge(challenge._id)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition-colors"
                        >
                          View Challenge
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {renderPagination()}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Create Challenge Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create New Challenge</h2>
                <button
                  onClick={() => { setShowCreateModal(false); resetForm(); }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Challenge Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Zero-Waste Kitchen Challenge"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Describe your challenge..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {categories.filter(c => c !== 'All Categories').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {difficultyLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.secondaryTag}
                    onChange={(e) => setFormData({ ...formData, secondaryTag: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Featured, New, Popular"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => { setShowCreateModal(false); resetForm(); }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateChallenge}
                    className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Create Challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;