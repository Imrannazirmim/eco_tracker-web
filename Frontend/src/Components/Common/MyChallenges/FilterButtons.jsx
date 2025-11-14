
const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const filters = ["All", "Ongoing", "Completed"];

  return (
    <div className="flex gap-4 mb-10 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeFilter === filter
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
