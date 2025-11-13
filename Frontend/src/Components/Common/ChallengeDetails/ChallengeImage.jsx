import React from "react";

const ChallengeImage = ({ imageUrl, title }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No Image Available</span>
        </div>
      )}
    </div>
  );
};

export default ChallengeImage;