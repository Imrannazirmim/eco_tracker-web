import React, { useState } from "react";
import { Search } from "lucide-react";
import ChallengeCard from "./ChallengeCard";

const ChallengeList = ({ challenges, resetFilters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(challenges.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const current = challenges.slice(start, start + itemsPerPage);

  
  const paginate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (challenges.length === 0)
    return (
      <div className="bg-white p-12 text-center rounded-lg shadow-sm">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="text-gray-400" size={32} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No challenges found</h3>
        <p className="text-gray-600 mb-4">Try adjusting your filters</p>
        <button onClick={resetFilters} className="px-6 py-2 bg-green-600 text-white rounded-lg">
          Reset Filters
        </button>
      </div>
    );

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {current.map((challenge) => (
          <ChallengeCard key={challenge._id} challenge={challenge} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => paginate(n)}
              className={`w-10 h-10 rounded-lg font-medium ${
                currentPage === n
                  ? "bg-green-600 text-white"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChallengeList;
