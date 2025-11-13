import React from "react";
import { Plus } from "lucide-react";

const categories = [
  "All Categories",
  "Waste Reduction",
  "Water Conservation",
  "Energy Saving",
  "Sustainable Living",
  "Plastic Free",
  "Community Cleanup",
  "Food & Agriculture",
];

const ChallengeFilters = ({ filters, setFilters, resetFilters, user, onCreate }) => (
  <aside className="lg:w-72 bg-white rounded-lg shadow-sm p-6 space-y-6 sticky top-4">
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-gray-900 text-lg">Filters</h3>
      <button onClick={resetFilters} className="text-sm text-green-600 font-medium hover:underline">
        Reset
      </button>
    </div>

    {/* Category */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      >
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
    </div>

    {/* Duration */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Challenge Duration</label>
      {["all", "week", "month", "3months"].map((range) => (
        <label key={range} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="radio"
            name="dateRange"
            value={range}
            checked={filters.dateRange === range}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
          />
          {range === "all" && "All Durations"}
          {range === "week" && "Up to 1 week"}
          {range === "month" && "Up to 1 month"}
          {range === "3months" && "Up to 3 months"}
        </label>
      ))}
    </div>

    {/* Participants */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Participants</label>
      <select
        value={filters.participants}
        onChange={(e) => setFilters({ ...filters, participants: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      >
        <option value="all">All Sizes</option>
        <option value="small">&lt; 100 joined</option>
        <option value="medium">100 - 500 joined</option>
        <option value="large">500+ joined</option>
      </select>
    </div>

    {user && (
      <button
        onClick={onCreate}
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
      >
        <Plus size={20} />
        Create Challenge
      </button>
    )}
  </aside>
);

export default ChallengeFilters;
