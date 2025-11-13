import React, { useState } from "react";
import { X } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";

const categories = [
  "Waste Reduction",
  "Water Conservation",
  "Energy Saving",
  "Sustainable Living",
  "Plastic Free",
  "Community Cleanup",
  "Food & Agriculture",
];

const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

const ChallengeModal = ({ onClose, onCreated }) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    secondaryTag: "",
    startDate: "",
    endDate: "",
    difficulty: "",
    participants: 0,
    // Added missing required fields
    duration: 0,
    target: "",
    impactMetric: "",
    howToParticipate: [],
    environmentalImpact: "",
    communityGoal: {
      goal: "",
      currentProgress: 0,
      percentage: 0,
    },
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { title, description, category, startDate, endDate } = formData;

    // Validation
    if (!title || !description || !category || !startDate || !endDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Calculate duration
    const duration = calculateDuration(startDate, endDate);
    
    if (duration <= 0) {
      toast.error("End date must be after start date");
      return;
    }

    try {
      setLoading(true);
      
      // Prepare data to send
      const submitData = {
        ...formData,
        duration,
        // Ensure empty strings don't break the backend
        target: formData.target || "Complete the challenge",
        impactMetric: formData.impactMetric || "participation",
        environmentalImpact: formData.environmentalImpact || "Positive environmental impact",
        howToParticipate: formData.howToParticipate.length > 0 
          ? formData.howToParticipate 
          : ["Join the challenge", "Complete daily tasks", "Track your progress"],
        communityGoal: {
          goal: formData.communityGoal.goal || "Community participation goal",
          currentProgress: 0,
          percentage: 0,
        },
      };

      console.log("Submitting challenge:", submitData);

      const response = await axiosSecure.post("/api/challenges", submitData);
      
      console.log("Challenge created:", response.data);
      toast.success("Challenge created successfully!");
      
      if (onCreated) onCreated();
      onClose();
    } catch (error) {
      console.error("Error creating challenge:", error);
      
      if (error.response) {
        console.error("Error response:", error.response.data);
        toast.error(error.response.data.message || "Failed to create challenge");
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from server. Please check your connection.");
      } else {
        console.error("Error:", error.message);
        toast.error("Failed to create challenge: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create New Challenge</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
            >
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challenge Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Zero-Waste Kitchen Challenge"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Describe your challenge..."
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Category + Difficulty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => handleChange("difficulty", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select difficulty</option>
                    {difficultyLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Start / End Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange("endDate", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              {/* Target & Impact Metric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.target}
                    onChange={(e) => handleChange("target", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Reduce 100kg CO2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Impact Metric (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.impactMetric}
                    onChange={(e) => handleChange("impactMetric", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., CO2 saved, trees planted"
                  />
                </div>
              </div>

              {/* Secondary Tag */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Tag (Optional)
                </label>
                <input
                  type="text"
                  value={formData.secondaryTag}
                  onChange={(e) => handleChange("secondaryTag", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Featured, Popular"
                />
              </div>

              {/* Environmental Impact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Environmental Impact (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.environmentalImpact}
                  onChange={(e) => handleChange("environmentalImpact", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Describe the environmental benefits..."
                />
              </div>

              {/* Community Goal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Community Goal (Optional)
                </label>
                <input
                  type="text"
                  value={formData.communityGoal.goal}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      communityGoal: { ...prev.communityGoal, goal: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 100 participants to complete the challenge"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    "Create Challenge"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChallengeModal;