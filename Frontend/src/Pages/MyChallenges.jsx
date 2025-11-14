import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../Components/Utils/Loading";
import { useNavigate } from "react-router";
import MyChallengesHeader from "../Components/Common/MyChallenges/MyChallengesHeader";
import FilterButtons from "../Components/Common/MyChallenges/FilterButtons";
import EmptyState from "../Components/Common/MyChallenges/EmptyState";
import ChallengeCard from "../Components/Common/Challenges/ChallengeCard";
import UpdateProgressModal from "../Components/Common/MyChallenges/UpdateProgressModal";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyChallenges = () => {
      const [data, setData] = useState([]);
      const [filteredData, setFilteredData] = useState([]);
      const [activeFilter, setActiveFilter] = useState("All");
      const [loading, setLoading] = useState(true);
      const [selectedChallenge, setSelectedChallenge] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);

      const auth = getAuth();
      const axiosInstance = useAxiosSecure();
      const user = auth.currentUser;
      const navigate = useNavigate();

      useEffect(() => {
            const loadChallenges = async () => {
                  if (!user) {
                        setLoading(false);
                        return;
                  }

                  try {
                        const res = await axiosInstance.get(`/api/user-challenges?email=${user.email}`);
                        setData(res.data);
                        setFilteredData(res.data);
                  } catch (error) {
                        toast.error(error.message || "Failed to load challenges");
                  } finally {
                        setLoading(false);
                  }
            };
            loadChallenges();
      }, [axiosInstance, user]);

      const handleFilter = (filter) => {
            setActiveFilter(filter);

            if (filter === "All") {
                  setFilteredData(data);
            } else if (filter === "Ongoing") {
                  setFilteredData(data.filter((item) => item.status !== "Completed" && (item.progress || 0) < 100));
            } else if (filter === "Completed") {
                  setFilteredData(data.filter((item) => item.status === "Completed" || (item.progress || 0) >= 100));
            }
      };

      const handleUpdateClick = (challenge) => {
            setSelectedChallenge(challenge);
            setIsModalOpen(true);
      };

      const handleProgressUpdate = async (updatedProgress) => {
            try {
                  await axiosInstance.patch(`/api/user-challenges/${selectedChallenge._id}`, {
                        progress: updatedProgress,
                        percentage: updatedProgress,
                        status: updatedProgress >= 100 ? "Completed" : "In Progress",
                  });

                  const updatedData = data.map((item) =>
                        item._id === selectedChallenge._id
                              ? {
                                      ...item,
                                      progress: updatedProgress,
                                      percentage: updatedProgress,
                                      status: updatedProgress >= 100 ? "Completed" : "In Progress",
                                }
                              : item
                  );

                  setData(updatedData);

                  if (activeFilter === "All") {
                        setFilteredData(updatedData);
                  } else {
                        const filtered = updatedData.filter((item) => {
                              if (activeFilter === "Ongoing") {
                                    return item.status !== "Completed" && (item.progress || 0) < 100;
                              } else if (activeFilter === "Completed") {
                                    return item.status === "Completed" || (item.progress || 0) >= 100;
                              }
                              return true;
                        });
                        setFilteredData(filtered);
                  }

                  toast.success("Progress updated successfully!");
                  setIsModalOpen(false);
            } catch (error) {
                  toast.error(error.response?.data?.message || "Failed to update progress");
            }
      };

      if (loading) return <Loading />;

      if (!user) {
            return (
                  <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                              <h2 className="text-2xl font-bold mb-4">Please login to view your challenges</h2>
                              <button
                                    onClick={() => navigate("/sign")}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                              >
                                    Go to Login
                              </button>
                        </div>
                  </div>
            );
      }

      return (
            <>
                  <ToastContainer />
                  <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8 lg:px-20">
                        <MyChallengesHeader user={user} />

                        <FilterButtons activeFilter={activeFilter} onFilterChange={handleFilter} />

                        {filteredData.length === 0 ? (
                              <EmptyState
                                    activeFilter={activeFilter}
                                    onBrowseChallenges={() => navigate("/challenges")}
                              />
                        ) : (
                              <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {filteredData.map((challenge) => (
                                          <ChallengeCard
                                                key={challenge._id}
                                                challenge={challenge}
                                                onUpdate={() => handleUpdateClick(challenge)}
                                                onViewDetails={() => navigate(`/challenges/${challenge.challengeId}`)}
                                          />
                                    ))}
                              </section>
                        )}
                  </main>

                  {isModalOpen && (
                        <UpdateProgressModal
                              challenge={selectedChallenge}
                              onClose={() => setIsModalOpen(false)}
                              onUpdate={handleProgressUpdate}
                        />
                  )}
            </>
      );
};

export default MyChallenges;
