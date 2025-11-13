import React from "react";

const ChallengeHeader = ({ category, secondaryTag, title }) => {
  return (
    <>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {category && (
          <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            {category}
          </span>
        )}
        {secondaryTag && (
          <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {secondaryTag}
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
    </>
  );
};

export default ChallengeHeader;