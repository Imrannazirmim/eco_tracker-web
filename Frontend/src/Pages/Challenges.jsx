import React, { useContext, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { AuthContext } from "../Contexts/RootContext";
import useChallenges from "../Hooks/useChallenges";
import ChallengeList from "../Components/Common/Challenges/ChallengeList";
import ChallengeFilters from "../Components/Common/Challenges/ChallengeFilter";
import { ChallengeGridSkeleton } from "../Components/Utils/SkeletonLoader";
import ChallengeModal from "../Components/Common/Challenges/ChallengeModal";

const Challenges = () => {
      const { user } = useContext(AuthContext);
      const { challenges, filteredChallenges, loading, filters, setFilters, resetFilters, fetchChallenges } =
            useChallenges();

      const [showCreateModal, setShowCreateModal] = useState(false);

      console.log(challenges);

      useEffect(() => {
            fetchChallenges();
      }, []);

      if (loading) return <ChallengeGridSkeleton count={8} />;

      return (
            <div className="min-h-screen bg-gray-50">
                  <div className="max-w-[1400px] mx-auto px-4 py-8">
                        {/* Header */}
                        <div className="text-center mb-12">
                              <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Your Next Challenge</h1>
                              <p className="text-gray-600 mb-8">
                                    Find and join meaningful challenges for a better lifestyle
                              </p>
                              <div className="max-w-2xl mx-auto relative">
                                    <Search
                                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                          size={20}
                                    />
                                    <input
                                          type="text"
                                          placeholder="Search challenges..."
                                          value={filters.search}
                                          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500"
                                    />
                              </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6">
                              {/* Filters */}
                              <ChallengeFilters
                                    user={user}
                                    filters={filters}
                                    setFilters={setFilters}
                                    resetFilters={resetFilters}
                                    onCreate={() => setShowCreateModal(true)}
                              />

                              {/* Challenge List */}
                              <ChallengeList challenges={filteredChallenges} resetFilters={resetFilters} />
                        </div>
                  </div>

                  {/* Create Modal */}
                  {showCreateModal && (
                        <ChallengeModal onClose={() => setShowCreateModal(false)} onCreated={fetchChallenges} />
                  )}
            </div>
      );
};

export default Challenges;
