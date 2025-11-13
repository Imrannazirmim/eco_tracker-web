import React from "react";
import { Users, Calendar, Tag, Clock } from "lucide-react";
import { formatDate, calculateDuration } from "../../Utils/dateHelpers";

const ChallengeDetailsCard = ({ challenge, participants }) => {
  const detailItems = [
    {
      icon: Tag,
      label: "Category",
      value: challenge.category || "No Category",
    },
    {
      icon: Clock,
      label: "Duration",
      value: `${challenge.duration || calculateDuration(challenge.startDate, challenge.endDate)} Days`,
    },
    {
      icon: Users,
      label: "Participants",
      value: `${participants.toLocaleString()} Joined`,
    },
    {
      icon: Calendar,
      label: "Dates",
      value: `${formatDate(challenge.startDate)} - ${formatDate(challenge.endDate)}`,
      subValue: `(${calculateDuration(challenge.startDate, challenge.endDate)} days)`,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Challenge Details
      </h3>

      <div className="space-y-4">
        {detailItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                <p className="font-semibold text-gray-900">{item.value}</p>
                {item.subValue && (
                  <p className="text-xs text-gray-500 mt-1">{item.subValue}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChallengeDetailsCard;