import { Users, Calendar, Tag, Clock } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";

const ChallengeDetails = () => {
      const challenge = useLoaderData();
      const navigate = useNavigate();
      console.log(challenge);

      // Handle case where challenge challenge might be undefined
      if (!challenge) {
            return (
                  <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                              <h2 className="text-2xl font-bold text-gray-900 mb-4">challenge Not Found</h2>
                              <button
                                    onClick={() => navigate("/challenges")}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                              >
                                    Back to Challenge
                              </button>
                        </div>
                  </div>
            );
      }

      // Format dates safely
      const formatDate = (dateString) => {
            if (!dateString) return "N/A";
            try {
                  return new Date(dateString).toLocaleDateString();
            } catch (error) {
                  throw new Error(error);
            }
      };

      // Calculate duration safely
      const calculateDuration = () => {
            if (!challenge.startDate || !challenge.endDate) return "N/A";
            try {
                  const start = new Date(challenge.startDate);
                  const end = new Date(challenge.endDate);
                  const diffTime = Math.abs(end - start);
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays;
            } catch (error) {
                  throw new Error(error);
            }
      };

      return (
            <div className="min-h-screen mt-10">
                  <div className="pt-10 flex ml-84">
                        <button className="btn" onClick={() => navigate("/challenges")}>
                              Back to Challenge
                        </button>
                  </div>
                  <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                              {/* Left Column */}
                              <div className="lg:col-span-1 space-y-6">
                                    {/* Image Card */}
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                                          {challenge.imageUrl && (
                                                <img
                                                      src={challenge.imageUrl}
                                                      alt={challenge.title}
                                                      className="w-full h-64 object-cover"
                                                />
                                          )}
                                    </div>

                                    {/* challenge Details Card */}
                                    <div className="bg-white rounded-2xl p-6 ">
                                          <h3 className="text-xl font-bold text-gray-900 mb-6">challenge Details</h3>

                                          <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                                            <Tag className="w-5 h-5 text-green-600" />
                                                      </div>
                                                      <div className="flex-1">
                                                            <p className="text-sm text-gray-600 mb-1">Category</p>
                                                            <p className="font-semibold text-gray-900">
                                                                  {challenge.category || "No Categories"}
                                                            </p>
                                                      </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                                            <Clock className="w-5 h-5 text-green-600" />
                                                      </div>
                                                      <div className="flex-1">
                                                            <p className="text-sm text-gray-600 mb-1">Duration</p>
                                                            <p className="font-semibold text-gray-900">
                                                                  {challenge.duration} Days
                                                            </p>
                                                      </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                                            <Users className="w-5 h-5 text-green-600" />
                                                      </div>
                                                      <div className="flex-1">
                                                            <p className="text-sm text-gray-600 mb-1">Participants</p>
                                                            <p className="font-semibold text-gray-900">
                                                                  {challenge.participants
                                                                        ? challenge.participants.toLocaleString()
                                                                        : 0}{" "}
                                                                  Joined
                                                            </p>
                                                      </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                                            <Calendar className="w-5 h-5 text-green-600" />
                                                      </div>
                                                      <div className="flex-1">
                                                            <p className="text-sm text-gray-600 mb-1">Dates</p>
                                                            <p className="text-sm">
                                                                  {formatDate(challenge.startDate)} -{" "}
                                                                  {formatDate(challenge.endDate)} ({calculateDuration()}{" "}
                                                                  days)
                                                            </p>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-white rounded-2xl p-8">
                                          <div className="flex gap-2 mb-4">
                                                <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                      {challenge.category}
                                                </span>
                                                <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                      {challenge.secondaryTag}
                                                </span>
                                          </div>

                                          <h1 className="text-4xl font-bold text-gray-900 mb-6">{challenge.title}</h1>

                                          {/* Description */}
                                          <div className="mb-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                                                <p className="text-gray-700 leading-relaxed">
                                                      {challenge.description || "No Description"}
                                                </p>
                                          </div>

                                          {/* How to Participate */}
                                          <div className="mb-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                                      How to Participate
                                                </h3>
                                                <ul className="space-y-3">
                                                      {challenge.howToParticipate &&
                                                            Array.isArray(challenge.howToParticipate) &&
                                                            challenge.howToParticipate.length > 0 && (
                                                                  <ul>
                                                                        {challenge.howToParticipate.map(
                                                                              (item, index) => (
                                                                                    <li
                                                                                          key={index}
                                                                                          className="flex  gap-3 text-gray-700"
                                                                                    >
                                                                                          <span className="text-green-600 font-bold shrink-0">
                                                                                                <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                                                                                          </span>
                                                                                          <span className="leading-relaxed">
                                                                                                {item}
                                                                                          </span>
                                                                                    </li>
                                                                              )
                                                                        )}
                                                                  </ul>
                                                            )}
                                                </ul>
                                          </div>

                                          {/* Environmental Impact */}
                                          <div className="mb-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                                      Environmental Impact
                                                </h3>
                                                <p className="text-gray-700 leading-relaxed">
                                                      {challenge.environmentalImpact}
                                                </p>
                                          </div>

                                          {/* Community Goal */}
                                          <div className="bg-gray-50 rounded-xl p-6">
                                                <div className="flex justify-between items-center mb-3">
                                                      <h4 className="font-bold text-gray-900">Community Goal</h4>
                                                      <span className="text-green-600 font-bold">
                                                            {challenge.communityGoal?.percentage}% Complete
                                                      </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-3">
                                                      {challenge.communityGoal?.goal}
                                                </p>
                                                <div className="flex flex-col gap-1  text-gray-600 mb-3">
                                                      <h4 className="font-bold text-gray-900">currentProgress </h4>
                                                      <p> {challenge.communityGoal?.currentProgress}</p>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                      <div
                                                            className="bg-green-500 h-3 rounded-full transition-all duration-500"
                                                            style={{ width: `${challenge.communityGoal?.percentage}%` }}
                                                      ></div>
                                                </div>
                                          </div>

                                          {/* Action Buttons */}
                                          <div className="flex gap-4 mt-6">
                                                <button
                                                      className={`flex-1 py-4 rounded-xl font-bold bg-green-600 hover:bg-green-700 text-white transition-colors `}
                                                >
                                                      Join Challenge
                                                </button>
                                                <button className="px-6 py-4 bg-white border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                                      Share
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default ChallengeDetails;
