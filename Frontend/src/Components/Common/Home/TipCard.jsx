import React from "react";
import { ArrowRight } from "lucide-react";

const TipCard = ({ tip, index }) => {
  return (
    <div className="flex items-start space-x-4 bg-white p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
      <div className="shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <span className="text-green-600 font-semibold">{index + 1}</span>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
        <p className="text-sm text-gray-500">By {tip.author}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-400" />
    </div>
  );
};

export default TipCard;