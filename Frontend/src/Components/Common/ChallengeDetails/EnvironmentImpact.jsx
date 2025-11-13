import React from "react";

const EnviromentImpact = ({ impact }) => {
  if (!impact) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-3">
        Environmental Impact
      </h3>
      <p className="text-gray-700 leading-relaxed">{impact}</p>
    </div>
  );
};

export default EnviromentImpact;