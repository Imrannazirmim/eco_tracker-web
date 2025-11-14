import React from "react";

const EmptyState = ({ activeFilter, onBrowseChallenges }) => {
  const getMessage = () => {
    switch (activeFilter) {
      case "Ongoing":
        return {
          title: "No Ongoing Challenges",
          description: "You don't have any challenges in progress. Start a new challenge today!",
        };
      case "Completed":
        return {
          title: "No Completed Challenges",
          description: "You haven't completed any challenges yet. Keep going!",
        };
      default:
        return {
          title: "No Challenges Found",
          description: "You haven't joined any challenges yet. Start your eco journey today!",
        };
    }
  };

  const { title, description } = getMessage();

  return (
    <div className="text-center py-20">
      <div className="text-gray-400 mb-4">
        <svg
          className="mx-auto h-24 w-24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <button
        onClick={onBrowseChallenges}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
      >
        Browse Challenges
      </button>
    </div>
  );
};

export default EmptyState;