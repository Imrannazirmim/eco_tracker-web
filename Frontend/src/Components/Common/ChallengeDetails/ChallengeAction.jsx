import React from "react";

const ChallengeActions = ({ onJoin, alreadyJoined, isJoining }) => {
  return (
    <div className="mt-8 flex gap-4">
      <button
        onClick={onJoin}
        disabled={alreadyJoined || isJoining}
        className={`flex-1 py-4 rounded-xl font-bold text-white transition-colors ${
          alreadyJoined
            ? "bg-gray-400 cursor-not-allowed"
            : isJoining
            ? "bg-green-500 cursor-wait"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isJoining ? (
          <span className="flex items-center justify-center gap-2">
            Joining...
          </span>
        ) : alreadyJoined ? (
          "Already Joined ✓"
        ) : (
          "Join Challenge"
        )}
      </button>
      
      <button className="px-6 py-4 bg-white border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
        Share
      </button>
    </div>
  );
};

export default ChallengeActions;