import React from "react";
import { CheckCircle } from "lucide-react";

const Milestones = ({ activities }) => {
  const total = activities.reduce(
    (sum, a) =>
      sum +
      (Number(a.progress) ||
        Number(a?.challengeInfo?.progress) ||
        0),
    0
  );

  const milestones = [
    { label: "New Beginner", amount: 20 },
    { label: "Eco Learner", amount: 50 },
    { label: "Planet Helper", amount: 100 },
    { label: "Earth Guardian", amount: 200 },
  ];

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4">Your Milestones</h2>

      <div className="space-y-4">
        {milestones.map((m, i) => {
          const unlocked = total >= m.amount;

          return (
            <div
              key={i}
              className={`flex items-center p-3 rounded-xl border ${
                unlocked ? "border-green-500 bg-green-600/10" : "border-gray-700"
              }`}
            >
              <CheckCircle
                className={`mr-3 ${unlocked ? "text-green-400" : "text-gray-500"}`}
              />
              <p className="text-lg">{m.label} – {m.amount} pts</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Milestones;
