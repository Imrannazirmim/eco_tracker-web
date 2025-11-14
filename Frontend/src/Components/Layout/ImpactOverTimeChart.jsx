import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ImpactOverTimeChart = ({ activities }) => {
  const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const progressByDay = week.map((day) => {
    const entries = activities.filter((a) => {
      const d = new Date(a.updatedAt || a.createdAt);
      return d.toLocaleString("en-US", { weekday: "short" }) === day;
    });

    const sum = entries.reduce(
      (s, x) =>
        s +
        (Number(x.progress) ||
          Number(x?.challengeInfo?.progress) ||
          0),
      0
    );

    return { day, impact: sum };
  });

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4">Impact Over Time</h2>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={progressByDay}>
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              color: "white",
            }}
          />
          <Line
            type="monotone"
            dataKey="impact"
            stroke="#22c55e"
            strokeWidth={3}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ImpactOverTimeChart;
