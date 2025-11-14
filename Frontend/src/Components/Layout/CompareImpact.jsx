import React from "react";

const CompareImpact = ({ activities }) => {
  const cleanProgress = activities.map(
    (a) => Number(a.progress) || Number(a?.challengeInfo?.progress) || 0
  );

  const userImpact = cleanProgress.reduce((a, b) => a + b, 0);

  const communityAvg = 55; 

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4">How You Compare</h2>

      <div className="space-y-4">
        <div>
          <p className="text-gray-400 text-sm mb-1">Your Impact</p>
          <p className="font-bold text-xl">{userImpact} kg</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm mb-1">Community Avg</p>
          <p className="font-bold text-xl">{communityAvg} kg</p>
        </div>
      </div>
    </div>
  );
};

export default CompareImpact;
