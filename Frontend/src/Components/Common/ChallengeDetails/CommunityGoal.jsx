import React from "react";

const CommunityGoal = ({ goal }) => {
  if (!goal) return null;

  const percentage = goal.percentage || 0;
  const currentProgress = goal.currentProgress || 0;
  const goalText = goal.goal || "No goal set";

  return (
    <div className="bg-linear-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold text-gray-900">Community Goal</h4>
        <span className="text-green-600 font-bold">
          {percentage}% Complete
        </span>
      </div>
      
      <p className="text-sm text-gray-700 mb-3">{goalText}</p>
      
      {currentProgress > 0 && (
        <p className="text-xs text-gray-600 mb-3">
          Current Progress: {currentProgress}
        </p>
      )}
      
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-green-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CommunityGoal;