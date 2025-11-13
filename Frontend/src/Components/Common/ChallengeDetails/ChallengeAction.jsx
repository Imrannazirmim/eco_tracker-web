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
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4" 
                fill="none"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
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