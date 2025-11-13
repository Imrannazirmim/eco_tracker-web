import React from "react";
import { Users } from "lucide-react";
import { useNavigate } from "react-router";

const ChallengeCard = ({ challenge }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/challenges/${challenge._id}`)}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
    >
      <img
        src={challenge.imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400"}
        alt={challenge.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {challenge.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {challenge.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{challenge.participants || 0} participants</span>
          </span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
            {challenge.category}
          </span>
        </div>
        <button className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
          Join Challenge
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;