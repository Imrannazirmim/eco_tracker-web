// CreateChallenge.jsx - Updated with full communityGoal fields (goal, currentProgress, percentage)
// Initialize currentProgress as '0' and percentage as 0
// Added inputs for all three; percentage can be auto-set if needed, but included as editable for flexibility

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { MdDateRange } from "react-icons/md";
import useAxiosSecure from "../Hooks/useAxiosSecure.jsx";

const CreateChallenge = () => {
      const axiosInstance = useAxiosSecure();
      const navigate = useNavigate();
      const [loading, setLoading] = useState(false);

      const [formData, setFormData] = useState({
            title: "",
            category: "",
            secondaryTag: "",
            description: "",
            startDate: "",
            endDate: "",
            imageUrl: "",
            target: "",
            impactMetric: "",
            howToParticipate: "",
            environmentalImpact: "",
            communityGoal: {
                  goal: "",
                  currentProgress: "0", // Added as requested, default 0
                  percentage: 0, // Added as requested, default 0
            },
      });
      

      // Predefined categories based on schema example; extend as needed
      const categories = [
            "Sustainable Transport",
            "Waste Reduction",
            "Energy Saving",
            "Water Conservation",
            "Biodiversity",
            "Health",
      ];

      // Predefined impact metrics; extend as needed
      const impactMetrics = [
            "CO2 saved",
            "kilograms (kg)",
            "liters (L)",
            "trees planted",
            "hours volunteered",
            "plastic waste reduced",
      ];

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handleCommunityGoalChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                  ...prev,
                  communityGoal: {
                        ...prev.communityGoal,
                        [name]: name === "percentage" ? parseFloat(value) || 0 : value,
                  },
            }));
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            if (!formData.title || !formData.category || !formData.startDate || !formData.endDate) {
                  toast.error("Title, category, and dates are required.");
                  return;
            }
            // Calculate duration
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            if (duration <= 0) {
                  toast.error("End date must be after start date.");
                  return;
            }
            // Prepare data: split howToParticipate by newlines
            const submitData = {
                  ...formData,
                  duration,
                  howToParticipate: formData.howToParticipate.split("\n").filter((item) => item.trim() !== ""),
                  // Auto-set createdBy if user context available; stub here
                  createdBy: "admin@ecotrack.com", // Replace with actual user email
            };
            // Trim goal
            submitData.communityGoal.goal = submitData.communityGoal.goal.trim();

            setLoading(true);
            try {
                  await axiosInstance.post("/api/challenges", submitData);
                  toast.success("Challenge created successfully!");
                  navigate("/challenges");
            } catch (error) {
                  toast.error("Failed to create challenge: " + error.message);
            } finally {
                  setLoading(false);
            }
      };

      const handleCancel = () => {
            navigate("/challenges");
      };

      return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8">
                              <div>
                                    <h1 className="text-3xl font-bold text-gray-900">Create a New Challenge</h1>
                                    <p className="text-gray-600 mt-2">
                                          Fill out the details below to launch a sustainability challenge for the
                                          community.
                                    </p>
                              </div>
                              <button
                                    onClick={handleCancel}
                                    className="text-gray-400 hover:text-gray-600 text-3xl font-bold self-start"
                              >
                                    ×
                              </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-xl p-8 space-y-8">
                              {/* Title, Category, and Secondary Tag Row */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Challenge Title *
                                          </label>
                                          <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Bike to Work Week"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                required
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Category *
                                          </label>
                                          <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                required
                                          >
                                                <option value="">Select a category</option>
                                                {categories.map((cat) => (
                                                      <option value={cat} key={cat}>
                                                            {cat}
                                                      </option>
                                                ))}
                                          </select>
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Secondary Tag
                                          </label>
                                          <input
                                                type="text"
                                                name="secondaryTag"
                                                value={formData.secondaryTag}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Health"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                          />
                                    </div>
                              </div>

                              {/* Description */}
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Detailed Description
                                    </label>
                                    <textarea
                                          name="description"
                                          value={formData.description}
                                          onChange={handleInputChange}
                                          placeholder="Describe the challenge, its goals, and why it's important..."
                                          rows={4}
                                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                                    />
                              </div>

                              {/* Dates Row */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Start Date *
                                          </label>
                                          <div className="relative">
                                                <input
                                                      type="date"
                                                      name="startDate"
                                                      value={formData.startDate}
                                                      onChange={handleInputChange}
                                                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-12"
                                                      required
                                                />
                                                <MdDateRange
                                                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                      size={20}
                                                />
                                          </div>
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                                End Date *
                                          </label>
                                          <div className="relative">
                                                <input
                                                      type="date"
                                                      name="endDate"
                                                      value={formData.endDate}
                                                      onChange={handleInputChange}
                                                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-12"
                                                      required
                                                />
                                                <MdDateRange
                                                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                      size={20}
                                                />
                                          </div>
                                    </div>
                              </div>

                              {/* Image URL */}
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Challenge Image URL
                                    </label>
                                    <input
                                          type="url"
                                          name="imageUrl"
                                          value={formData.imageUrl}
                                          onChange={handleInputChange}
                                          placeholder="https://example.com/image.jpg"
                                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    />
                              </div>

                              {/* Target and Impact Metric Row */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">Target</label>
                                          <input
                                                type="text"
                                                name="target"
                                                value={formData.target}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Save 2000kg of CO2 emissions"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Impact Metric
                                          </label>
                                          <select
                                                name="impactMetric"
                                                value={formData.impactMetric}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                          >
                                                <option value="">Select a metric</option>
                                                {impactMetrics.map((metric) => (
                                                      <option value={metric} key={metric}>
                                                            {metric}
                                                      </option>
                                                ))}
                                          </select>
                                    </div>
                              </div>

                              {/* How to Participate */}
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                          How to Participate
                                    </label>
                                    <textarea
                                          name="howToParticipate"
                                          value={formData.howToParticipate}
                                          onChange={handleInputChange}
                                          placeholder="Enter steps separated by new lines, e.g.:
Map out a safe bike route...
Pump up your tires...
Pack a repair kit...
Log your miles daily..."
                                          rows={6}
                                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                                    />
                              </div>

                              {/* Environmental Impact */}
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Environmental Impact
                                    </label>
                                    <textarea
                                          name="environmentalImpact"
                                          value={formData.environmentalImpact}
                                          onChange={handleInputChange}
                                          placeholder="Describe the environmental benefits, e.g., Cycling cuts down on fossil fuel use..."
                                          rows={3}
                                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                                    />
                              </div>

                              {/* Community Goal Section */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Community Goal *
                                          </label>
                                          <input
                                                type="text"
                                                name="goal"
                                                value={formData.communityGoal.goal}
                                                onChange={handleCommunityGoalChange}
                                                placeholder="e.g., 2000kg total CO2 savings from bike commutes"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Current Progress
                                          </label>
                                          <input
                                                type="text"
                                                name="currentProgress"
                                                value={formData.communityGoal.currentProgress}
                                                onChange={handleCommunityGoalChange}
                                                placeholder="e.g., 0kg"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Percentage
                                          </label>
                                          <input
                                                type="number"
                                                name="percentage"
                                                value={formData.communityGoal.percentage}
                                                onChange={handleCommunityGoalChange}
                                                placeholder="e.g., 0"
                                                min="0"
                                                max="100"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                          />
                                          <p className="text-xs text-gray-500 mt-1">Progress percentage (0-100).</p>
                                    </div>
                              </div>

                              {/* Buttons */}
                              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                    <button
                                          type="button"
                                          onClick={handleCancel}
                                          disabled={loading}
                                          className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
                                    >
                                          Cancel
                                    </button>
                                    <button
                                          type="submit"
                                          disabled={loading}
                                          className="px-8 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                                    >
                                          {loading ? "Creating..." : "Create Challenge"}
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default CreateChallenge;
