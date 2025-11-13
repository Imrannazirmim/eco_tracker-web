import React from "react";

const Participate = ({ steps }) => {
  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-3">
        How to Participate
      </h3>
      <ul className="space-y-3">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-3 text-gray-700">
            <span className="shrink-0 mt-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </span>
            <span className="leading-relaxed">{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Participate;