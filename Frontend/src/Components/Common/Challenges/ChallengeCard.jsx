import React from "react";
import { Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router";

const categoryColors = {
      "Waste Reduction": "bg-green-100 text-green-700",
      "Water Conservation": "bg-blue-100 text-blue-700",
      "Energy Saving": "bg-yellow-100 text-yellow-700",
      "Sustainable Living": "bg-purple-100 text-purple-700",
      "Plastic Free": "bg-teal-100 text-teal-700",
      "Community Cleanup": "bg-orange-100 text-orange-700",
      "Food & Agriculture": "bg-lime-100 text-lime-700",
};

const getCategoryColor = (category) => categoryColors[category] || "bg-gray-100 text-gray-700";

const calculateDuration = (startDate, endDate) => {
      if (!startDate || !endDate) return 0;
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const ChallengeCard = ({ challenge, onUpdate, onViewDetails }) => {
      const navigate = useNavigate();

      const getChallengeId = () => {
            return challenge.challengeId || challenge._id;
      };

      const handleViewDetails = () => {
            if (onViewDetails) {
                  onViewDetails();
            } else {
                  navigate(`/challenges/${getChallengeId()}`);
            }
      };

      const isMyChallenge = !!onUpdate;

      return (
            <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
                  <div className="relative h-48 overflow-hidden shrink-0">
                        <img
                              src={
                                    challenge.imageUrl ||
                                    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400"
                              }
                              alt={challenge.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                              <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                                          challenge.category
                                    )}`}
                              >
                                    {challenge.category}
                              </span>
                        </div>

                        {isMyChallenge && (
                              <div className="absolute top-4 right-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-gray-700 shadow-md">
                                          {challenge.progress || 0}% Complete
                                    </span>
                              </div>
                        )}
                  </div>

                  <div className="p-5 flex flex-col grow">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 min-h-14">
                              {challenge.title || challenge.challengeTitle}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 grow">{challenge.description}</p>

                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pt-2 border-t border-gray-100">
                              <div className="flex items-center gap-1">
                                    <Calendar size={16} className="text-green-600" />
                                    <span>{calculateDuration(challenge.startDate, challenge.endDate)} days</span>
                              </div>
                              <div className="flex items-center gap-1">
                                    <Users size={16} className="text-green-600" />
                                    <span>{challenge.participants || 0} joined</span>
                              </div>
                        </div>

                        {isMyChallenge ? (
                              <div className="flex gap-2">
                                    <button
                                          onClick={handleViewDetails}
                                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-medium transition-colors"
                                    >
                                          View Details
                                    </button>
                                    <button
                                          onClick={onUpdate}
                                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition-colors"
                                    >
                                          Update Progress
                                    </button>
                              </div>
                        ) : (
                              <button
                                    onClick={handleViewDetails}
                                    className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition-colors"
                              >
                                    View Challenge
                              </button>
                        )}
                  </div>
            </div>
      );
};

export default ChallengeCard;
