const StatsSection = ({ stats }) => {
      const statsData = [
            { label: "Completed Today", value: stats.challenges },
            { label: "Active Members", value: stats.users },
            { label: "Water Saved (Liters)", value: stats.co2Reduced },
            { label: "Trees Planted", value: stats.treesPlanted },
      ];

      const formatNumber = (num) => {
            const parsedNum = typeof num === "string" ? parseInt(num, 10) : Number(num);
            parsedNum.toLocaleString();
            if (num >= 1000000) {
                  return (num / 1000000).toFixed(2) + "M";
            } else if (num >= 1000) {
                  return (num / 1000).toFixed(1) + "K";
            }
            return num.toLocaleString();
      };

      return (
            <div className="bg-linear-to-r from-green-50 to-blue-50 py-12">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                              {statsData.map((stat, index) => (
                                    <div key={index} className="text-center">
                                          <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                                          <p className="text-4xl font-bold text-gray-900">{formatNumber(stat.value)}</p>
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default StatsSection;
