import React from "react";

const ChallengeCard = ({ challenge, onUpdate, onViewDetails }) => {
  const shortTitle = (title = "") => {
    const words = title.split(" ");
    return words.length <= 20 ? title : words.slice(0, 10).join(" ") + "...";
  };
 
  console.log(challenge, onViewDetails);
  
  const progress = Number(challenge.progress || 0);
  const isCompleted = progress >= 100;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      {/* Image */}
      <img
        src={challenge.imageUrl || "https://via.placeholder.com/400x300"}
        alt={challenge.challengeTitle}
        className="w-full h-52 object-cover"
      />

      {/* Header */}
      <div className="p-4 flex justify-between items-start gap-2">
        <h2 className="font-semibold text-gray-900 text-lg">
          {shortTitle(challenge.title || challenge.challengeTitle)}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            challenge.role === "creator"
              ? "bg-purple-100 text-purple-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {challenge.role === "creator" ? "Creator" : "Participant"}
        </span>
      </div>

      {/* Progress */}
      <div className="px-4 pb-4">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <h4 className="font-semibold text-gray-900">Progress</h4>
          <p className="font-medium">{progress}%</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Status Badge */}
        <div className="mt-2">
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              isCompleted
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {isCompleted ? "Completed" : challenge.status || "In Progress"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 p-4 border-t border-gray-100">
        <button
          onClick={onUpdate}
          className="flex-1 py-2 px-4 rounded-lg bg-pink-500 font-semibold hover:bg-pink-600 text-white transition-colors"
        >
          Update
        </button>
        <button
          onClick={onViewDetails}
          className="flex-1 py-2 px-4 rounded-lg bg-green-600 font-semibold hover:bg-green-700 text-white transition-colors"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;