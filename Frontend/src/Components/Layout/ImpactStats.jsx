import React from "react";

const StatCard = ({ label, value }) => (
  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
    <p className="text-gray-400 text-sm mb-1">{label}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const ImpactStats = ({ activities }) => {
  const cleanProgress = activities.map(
    (a) => Number(a?.progress) || Number(a?.challengeInfo?.progress) || 0
  );

  const totalProgress = cleanProgress.reduce((a, b) => a + b, 0);
  const avg = cleanProgress.length > 0 ? totalProgress / cleanProgress.length : 0;

  const co2Reduced = Math.round(avg * 2.5);
  const waterSaved = Math.round(avg * 15);
  const wasteDiverted = Math.round(avg * 0.8);
  const energySaved = Math.round(avg * 1.2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Total CO₂ Reduced" value={`${co2Reduced} kg`} />
      <StatCard label="Water Saved" value={`${waterSaved} L`} />
      <StatCard label="Waste Diverted" value={`${wasteDiverted} kg`} />
      <StatCard label="Energy Conserved" value={`${energySaved} kWh`} />
    </div>
  );
};

export default ImpactStats;
