import React from "react";
import { Calendar, MapPin, Users } from "lucide-react";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white p-5 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
      <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
      <div className="space-y-2 text-sm text-gray-600">
        <p className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{event.date}</span>
        </p>
        <p className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </p>
        <p className="flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>{event.attendees} attending</span>
        </p>
      </div>
    </div>
  );
};

export default EventCard;