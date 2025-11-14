import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const ActivityBreakdownChart = ({ activities }) => {
  const categories = {};

  activities.forEach((a) => {
    const c = a.challengeInfo?.category || "Other";
    categories[c] = (categories[c] || 0) + 1;
  });

  const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

  const data = Object.entries(categories).map(([name, value], i) => ({
    name,
    value,
    fill: colors[i % colors.length],
  }));

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4">Activity Breakdown</h2>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={50} outerRadius={80} label>
            {data.map((d, i) => (
              <Cell key={i} fill={d.fill} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: 8,
              color: "#fff",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityBreakdownChart;
