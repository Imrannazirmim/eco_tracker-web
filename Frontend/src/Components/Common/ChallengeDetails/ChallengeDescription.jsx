import React from "react";

const ChallengeDescription = ({ description }) => {
  if (!description) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
      <p className="text-gray-700 leading-relaxed">
        {description || "No description available"}
      </p>
    </div>
  );
};

export default ChallengeDescription;