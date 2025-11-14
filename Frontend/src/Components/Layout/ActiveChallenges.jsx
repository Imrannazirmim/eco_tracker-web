import React from "react";
import { useNavigate } from "react-router";

const ActiveChallenges = ({ activities }) => {
      const navigate = useNavigate();


      return (
            <div className="mt-10">
                  <h2 className="text-2xl font-bold mb-4">Your Active Challenges</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activities.map((item) => (
                              <div
                                    key={item._id}
                                    onClick={() => navigate(`/challenges/${item.challengeId}`)}
                                    className="cursor-pointer bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition"
                              >
                                    <h3 className="text-xl font-bold mb-2">
                                          {`${item?.challengeTitle.slice(0,30)}...` }
                                    </h3>

                                    <p className="text-gray-400 text-sm">{item?.category || "Unknown Category"}</p>

                                    <div className="mt-4 h-2 bg-gray-700 rounded-full">
                                          <div
                                                className="h-full bg-green-500 rounded-full"
                                                style={{
                                                      width: `${
                                                            Number(item?.progress) || Number(item?.progress) || 0
                                                      }%`,
                                                }}
                                          />
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default ActiveChallenges;
