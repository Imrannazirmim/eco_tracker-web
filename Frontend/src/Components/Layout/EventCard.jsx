import React from "react";
import { Calendar, MapPin, Users, UserPlus, Edit2, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const EventCard = ({ event, user, axiosSecure, openEditModal, refreshEvents }) => {
      const isEventFull = () => event.attendees >= event.maxParticipants;
      const isEventPast = () => new Date(event.date) < new Date();

      const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
            });
      };

      const handleJoinEvent = async () => {
            try {
                  await axiosSecure.post(`/api/events/join/${event._id}`);
                  await refreshEvents();
                  Swal.fire("Joined!", "You successfully joined the event", "success");
            } catch (error) {
                  Swal.fire("Oops!", "Failed to join event", error);
            }
      };

      const handleDeleteEvent = async () => {
            const result = await Swal.fire({
                  title: "Are you sure?",
                  text: "This will delete the event permanently.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                  try {
                        await axiosSecure.delete(`/api/events/${event._id}`);
                        await refreshEvents();
                        Swal.fire("Deleted!", "Event has been deleted.", "success");
                  } catch {
                        Swal.fire("Error", "Failed to delete event", "error");
                  }
            }
      };

      return (
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden h-full flex flex-col">
                  <div className={`h-2 ${isEventPast() ? "bg-gray-400" : "bg-green-500"}`}></div>
                  <div className="p-5 sm:p-6 grow flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                              <h3 className="text-xl font-bold text-gray-900 flex-1">{`${event.title.slice(0,20)}...`}</h3>
                              {event.createdBy === user?.email && (
                                    <div className="flex gap-2 ml-2">
                                          <button
                                                onClick={openEditModal}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                aria-label="Edit event"
                                          >
                                                <Edit2 size={16} />
                                          </button>
                                          <button
                                                onClick={handleDeleteEvent}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                aria-label="Delete event"
                                          >
                                                <Trash2 size={16} />
                                          </button>
                                    </div>
                              )}
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                        <div className="space-y-2 mb-4 grow">
                              <div className="flex items-center gap-2 text-gray-700">
                                    <Calendar size={16} className="text-green-600 shrink-0" />
                                    <span className="text-sm wrap-break-word">{formatDate(event.date)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-700">
                                    <MapPin size={16} className="text-green-600 shrink-0" />
                                    <span className="text-sm wrap-break-word">{event.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-700">
                                    <Users size={16} className="text-green-600 shrink-0" />
                                    <span className="text-sm wrap-break-word">
                                          {event.attendees}/{event.maxParticipants} participants
                                    </span>
                              </div>
                        </div>

                        {!isEventPast() && event.createdBy !== user?.email && (
                              <button
                                    onClick={handleJoinEvent}
                                    disabled={isEventFull()}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                                          isEventFull()
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                : "bg-green-600 hover:bg-green-700 text-white"
                                    } mt-auto`}
                              >
                                    <UserPlus size={18} /> {isEventFull() ? "Event Full" : "Join Event"}
                              </button>
                        )}

                        {isEventPast() && (
                              <div className="text-center text-gray-500 font-medium py-2 mt-auto">Event Completed</div>
                        )}
                  </div>
            </div>
      );
};

export default EventCard;
