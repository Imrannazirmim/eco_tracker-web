import React, { useState, useEffect} from "react";
import Swal from "sweetalert2";
import { Plus, Search, X, Lightbulb } from "lucide-react";
import { AuthContext } from "../Contexts/RootContext";
import useAxios from "../Hooks/useAxios";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import TipForm from "../Components/Layout/TipForm";
import { TipsListSkeleton } from "../Components/Utils/SkeletonLoader";
import TipCard from "../Components/Layout/TipCard";

const Tips = () => {
      const axios = useAxios();
      const axiosSecure = useAxiosSecure();

      const [tips, setTips] = useState([]);
      const [filteredTips, setFilteredTips] = useState([]);
      const [loading, setLoading] = useState(true);
      const [showCreateModal, setShowCreateModal] = useState(false);
      const [showEditModal, setShowEditModal] = useState(false);
      const [selectedTip, setSelectedTip] = useState(null);
      const [searchTerm, setSearchTerm] = useState("");
      const [categoryFilter, setCategoryFilter] = useState("all");
      // const [likedTips, setLikedTips] = useState(new Set());

      const categories = [
            "all",
            "Waste Management",
            "Plastic Free",
            "Energy",
            "Water Conservation",
            "Transportation",
            "Food",
            "Other",
      ];

      const [formData, setFormData] = useState({
            title: "",
            content: "",
            category: "Waste Management",
            authorName: "",
      });

      useEffect(() => {
            fetchTips();
      }, []);
      useEffect(() => {
            filterTips();
      }, [tips, searchTerm, categoryFilter]);

      const fetchTips = async () => {
            setLoading(true);
            try {
                  const response = await axios.get("/api/tips");
                  setTips(response.data);
            } catch (err) {
                  console.error(err);
            } finally {
                  setLoading(false);
            }
      };

      const filterTips = () => {
            let filtered = [...tips];
            if (categoryFilter !== "all") filtered = filtered.filter((t) => t.category === categoryFilter);
            if (searchTerm) {
                  filtered = filtered.filter(
                        (tip) =>
                              tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              tip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              tip.category.toLowerCase().includes(searchTerm.toLowerCase())
                  );
            }
            filtered.sort((a, b) => b.likes - a.likes);
            setFilteredTips(filtered);
      };

      const handleCreateTip = async () => {
            if (!formData.title || !formData.content)
                  return Swal.fire("Error", "Please fill in all required fields", "error");

            try {
                  await axiosSecure.post("/api/tips", formData);
                  setShowCreateModal(false);
                  resetForm();
                  fetchTips();
                  Swal.fire("Success", "Tip created successfully", "success");
            } catch (err) {
                  Swal.fire("Error", "Failed to create tip", err);
            }
      };

      const handleUpdateTip = async () => {
            try {
                  await axiosSecure.patch(`/api/tips/${selectedTip._id}`, formData);
                  setShowEditModal(false);
                  resetForm();
                  fetchTips();
                  Swal.fire("Success", "Tip updated successfully", "success");
            } catch (err) {
                  Swal.fire("Error", "Failed to update tip", err);
            }
      };

      const handleDeleteTip = async (tipId) => {
            const confirm = await Swal.fire({ title: "Are you sure?", icon: "warning", showCancelButton: true });
            if (!confirm.isConfirmed) return;

            try {
                  await axiosSecure.delete(`/api/tips/${tipId}`);
                  fetchTips();
                  Swal.fire("Deleted!", "Tip deleted successfully", "success");
            } catch (err) {
                  Swal.fire("Error", "Failed to delete tip", err);
            }
      };

      // const handleLikeTip = async (tipId) => {
      //       if (likedTips.has(tipId)) return Swal.fire("Info", "You already liked this tip!", "info");

      //       try {
      //             const tip = tips.find((t) => t._id === tipId);
      //             await axiosSecure.patch(`/api/tips/${tipId}`, { likes: tip.likes + 1 });
      //             setLikedTips(new Set([...likedTips, tipId]));
      //             fetchTips();
      //       } catch (err) {
      //             throw new Error(err);
      //       }
      // };

      const openEditModal = (tip) => {
            setSelectedTip(tip);
            setFormData({ ...tip });
            setShowEditModal(true);
      };
      const resetForm = () => setFormData({ title: "", content: "", category: "Waste Management", authorName: "" });

      return (
            <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-50 p-4 sm:p-6 lg:p-8">
                  <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                              <div>
                                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                                          Eco Tips & Guides
                                    </h1>
                                    <p className="text-gray-600">Share and discover sustainable living tips</p>
                              </div>
                              <button
                                    onClick={() => setShowCreateModal(true)}
                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                              >
                                    <Plus size={20} /> Share a Tip
                              </button>
                        </div>

                        {/* Search & Filter */}
                        <div className="flex flex-col lg:flex-row gap-4 mb-6">
                              <div className="flex-1 relative">
                                    <Search
                                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                          size={20}
                                    />
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
                                                      ? "bg-green-600 text-white"
                                                      : "bg-white text-gray-700 hover:bg-gray-100"
                                          }`}
                                    >
                                          {cat === "all" ? "All Tips" : cat}
                                    </button>
                              ))}
                        </div>

                        {/* Tips List */}
                        {loading ? (
                              <TipsListSkeleton count={4} />
                        ) : filteredTips.length === 0 ? (
                              <div className="text-center py-12">
                                    <Lightbulb size={64} className="mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No tips found</h3>
                                    <p className="text-gray-500">
                                          Try adjusting your filters or be the first to share a tip!
                                    </p>
                              </div>
                        ) : (
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {filteredTips.map((tip) => (
                                          <TipCard
                                                key={tip._id}
                                                tip={tip}
                                                onEdit={openEditModal}
                                                onDelete={handleDeleteTip}
                                          />
                                    ))}
                              </div>
                        )}

                        {showCreateModal && (
                              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                          <div className="p-6">
                                                <div className="flex justify-between items-center mb-6">
                                                      <h2 className="text-2xl font-bold text-gray-900">
                                                            Share Your Eco Tip
                                                      </h2>
                                                      <button
                                                            onClick={() => {
                                                                  setShowCreateModal(false);
                                                                  resetForm();
                                                            }}
                                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                      >
                                                            <X size={24} />
                                                      </button>
                                                </div>
                                                <TipForm
                                                      formData={formData}
                                                      setFormData={setFormData}
                                                      categories={categories}
                                                />
                                                <div className="flex gap-3 pt-4">
                                                      <button
                                                            onClick={() => {
                                                                  setShowCreateModal(false);
                                                                  resetForm();
                                                            }}
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
                        )}

                        {showEditModal && (
                              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                          <div className="p-6">
                                                <div className="flex justify-between items-center mb-6">
                                                      <h2 className="text-2xl font-bold text-gray-900">Edit Tip</h2>
                                                      <button
                                                            onClick={() => {
                                                                  setShowEditModal(false);
                                                                  resetForm();
                                                            }}
                                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                      >
                                                            <X size={24} />
                                                      </button>
                                                </div>
                                                <TipForm
                                                      formData={formData}
                                                      setFormData={setFormData}
                                                      categories={categories}
                                                />
                                                <div className="flex gap-3 pt-4">
                                                      <button
                                                            onClick={() => {
                                                                  setShowEditModal(false);
                                                                  resetForm();
                                                            }}
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
                        )}
                  </div>
            </div>
      );
};

export default Tips;
