import React, { useState, useEffect, useContext } from 'react';
import { Lightbulb, ThumbsUp, Edit2, Trash2, Plus, X, Search, Filter } from 'lucide-react';
import { AuthContext } from '../Contexts/RootContext';
import useAxios from '../Hooks/useAxios';
import useAxiosSecure from '../Hooks/useAxiosSecure';


const Tips = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();

  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [likedTips, setLikedTips] = useState(new Set());

  const categories = ['all', 'Waste Management', 'Plastic Free', 'Energy', 'Water Conservation', 'Transportation', 'Food', 'Other'];

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Waste Management',
    authorName: ''
  });

  useEffect(() => {
    fetchTips();
  }, []);

  useEffect(() => {
    filterTips();
  }, [tips, searchTerm, categoryFilter]);

  const fetchTips = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/tips');
      setTips(response.data);
    } catch (error) {
      console.error('Error fetching tips:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTips = () => {
    let filtered = [...tips];

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(tip => tip.category === categoryFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(tip =>
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => b.likes - a.likes);
    setFilteredTips(filtered);
  };

  const handleCreateTip = async () => {
    if (!formData.title || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await axiosSecure.post('/api/tips', formData);
      setShowCreateModal(false);
      resetForm();
      fetchTips();
      alert('Tip created successfully!');
      return response
    } catch (error) {
      console.error('Error creating tip:', error);
      alert('Failed to create tip');
    }
  };

  const handleUpdateTip = async () => {
    try {
      const response = await axiosSecure.patch(`/api/tips/${selectedTip._id}`, formData);
      setShowEditModal(false);
      resetForm();
      fetchTips();
      alert('Tip updated successfully!');
      return response
    } catch (error) {
      console.error('Error updating tip:', error);
      alert('Failed to update tip');
    }
  };

  const handleDeleteTip = async (tipId) => {
    if (!window.confirm('Are you sure you want to delete this tip?')) return;

    try {
      const response = await axiosSecure.delete(`/api/tips/${tipId}`);
      fetchTips();
      alert('Tip deleted successfully!');
      return response
    } catch (error) {
      console.error('Error deleting tip:', error);
      alert('Failed to delete tip');
    }
  };

  const handleLikeTip = async (tipId) => {
    if (likedTips.has(tipId)) {
      alert('You already liked this tip!');
      return;
    }

    try {
      const tip = tips.find(t => t._id === tipId);
      const response = await axiosSecure.patch(`/api/tips/${tipId}`, { likes: tip.likes + 1 });
      setLikedTips(new Set([...likedTips, tipId]));
      fetchTips();
      return response
    } catch (error) {
      console.error('Error liking tip:', error);
      alert('Failed to like tip');
    }
  };

  const openEditModal = (tip) => {
    setSelectedTip(tip);
    setFormData({
      title: tip.title,
      content: tip.content,
      category: tip.category,
      authorName: tip.authorName
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'Waste Management',
      authorName: ''
    });
    setSelectedTip(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Eco Tips & Guides</h1>
              <p className="text-gray-600">Share and discover sustainable living tips</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Plus size={20} />
              <span>Share a Tip</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  categoryFilter === cat
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat === 'all' ? 'All Tips' : cat}
              </button>
            ))}
          </div>
        </div>

        {filteredTips.length === 0 ? (
          <div className="text-center py-12">
            <Lightbulb size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No tips found</h3>
            <p className="text-gray-500">Try adjusting your filters or be the first to share a tip!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTips.map((tip) => (
              <div
                key={tip._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          {tip.category}
                        </span>
                        <span className="text-gray-500 text-sm">{formatDate(tip.createdAt)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{tip.title}</h3>
                    </div>
                    {tip.createdBy === user?.email && (
                      <div className="flex gap-2 ml-2">
                        <button
                          onClick={() => openEditModal(tip)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteTip(tip._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{tip.content}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Lightbulb size={16} className="text-green-600" />
                        <span className="text-sm font-medium text-gray-700">{tip.authorName || 'Anonymous'}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLikeTip(tip._id)}
                      disabled={likedTips.has(tip._id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        likedTips.has(tip._id)
                          ? 'bg-green-100 text-green-700 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                      }`}
                    >
                      <ThumbsUp size={16} />
                      <span>{tip.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Share Your Eco Tip</h2>
                  <button
                    onClick={() => { setShowCreateModal(false); resetForm(); }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tip Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., How to reduce food waste"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Share your sustainable living tip in detail..."
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
                        {categories.filter(c => c !== 'all').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.authorName}
                        onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Anonymous"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => { setShowCreateModal(false); resetForm(); }}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateTip}
                      className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Share Tip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Edit Tip</h2>
                  <button
                    onClick={() => { setShowEditModal(false); resetForm(); }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tip Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        {categories.filter(c => c !== 'all').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.authorName}
                        onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => { setShowEditModal(false); resetForm(); }}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateTip}
                      className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Update Tip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tips;