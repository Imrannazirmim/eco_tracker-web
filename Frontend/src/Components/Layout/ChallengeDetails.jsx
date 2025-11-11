import { Users, Calendar, Tag, Clock } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";

const ChallengeDetails = () => {
      const data = useLoaderData();
      const navigate = useNavigate();
      console.log(data);

      return (
            <div className="min-h-screen mt-10">
                <div className="pt-10 flex ml-84">
                    <button className="btn" onClick={()=>navigate('/challenges')}>Back To Page</button>
                </div>
                  <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                              {/* Left Column */}
                              <div className="lg:col-span-1 space-y-6">
                                    {/* Image Card */}
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                                          <img
                                                src={data.imageUrl}
                                                alt={data.title}
                                                className="w-full h-64 object-cover"
                                          />
                                    </div>

                                    {/* Challenge Details Card */}
                                    <div className="bg-white rounded-2xl p-6 ">
                                          <h3 className="text-xl font-bold text-gray-900 mb-6">Challenge Details</h3>

                                          <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                                            <Tag className="w-5 h-5 text-green-600" />
                                                      </div>
                                                      <div className="flex-1">
                                                            <p className="text-sm text-gray-600 mb-1">Category</p>
                                                            <p className="font-semibold text-gray-900">
                                                                  {data.category}
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
                                                                  {data.duration} Days
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
                                                                  {data.participants.toLocaleString()} Joined
                                                            </p>
                                                      </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                                            <Calendar className="w-5 h-5 text-green-600" />
                                                      </div>
                                                      <div className="flex-1">
                                                            <p className="text-sm text-gray-600 mb-1">Dates</p>
                                                            <p className="font-semibold text-gray-900">
                                                                  {data.startDate} - {data.endDate}
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
                                                      {data.category}
                                                </span>
                                                <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                      {data.secondaryTag}
                                                </span>
                                          </div>

                                          <h1 className="text-4xl font-bold text-gray-900 mb-6">{data.title}</h1>

                                          {/* Description */}
                                          <div className="mb-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                                                <p className="text-gray-700 leading-relaxed">{data.description}</p>
                                          </div>

                                          {/* How to Participate */}
                                          <div className="mb-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                                      How to Participate
                                                </h3>
                                                <ul className="space-y-3">
                                                      {data.howToParticipate.map((item, index) => (
                                                            <li key={index} className="flex  gap-3 text-gray-700">
                                                                  <span className="text-green-600 font-bold shrink-0">
                                                                        <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                                                                  </span>
                                                                  <span className="leading-relaxed">{item}</span>
                                                            </li>
                                                      ))}
                                                </ul>
                                          </div>

                                          {/* Environmental Impact */}
                                          <div className="mb-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                                      Environmental Impact
                                                </h3>
                                                <p className="text-gray-700 leading-relaxed">
                                                      {data.environmentalImpact}
                                                </p>
                                          </div>

                                          {/* Community Goal */}
                                          <div className="bg-gray-50 rounded-xl p-6">
                                                <div className="flex justify-between items-center mb-3">
                                                      <h4 className="font-bold text-gray-900">Community Goal</h4>
                                                      <span className="text-green-600 font-bold">
                                                            {data.communityGoal.percentage}% Complete
                                                      </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-3">{data.communityGoal.goal}</p>
                                                <p className="flex flex-col gap-1  text-gray-600 mb-3">
                                                      <h4 className="font-bold text-gray-900">currentProgress </h4>
                                                      {data.communityGoal.currentProgress}
                                                </p>
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                      <div
                                                            className="bg-green-500 h-3 rounded-full transition-all duration-500"
                                                            style={{ width: `${data.communityGoal.percentage}%` }}
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
