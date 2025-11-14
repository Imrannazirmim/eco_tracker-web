import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Swal from "sweetalert2";

const EventModal = ({ type, event, closeModal, refreshEvents, axiosSecure }) => {
      const [formData, setFormData] = useState({
            title: "",
            description: "",
            date: "",
            location: "",
            maxParticipants: "",
            category: "Cleanup",
      });

      useEffect(() => {
            if (type === "edit" && event) {
                  setFormData({
                        title: event.title,
                        description: event.description,
                        date: new Date(event.date).toISOString().slice(0, 16),
                        location: event.location,
                        maxParticipants: event.maxParticipants,
                        category: event.category,
                  });
            }
      }, [event, type]);

      const resetForm = () =>
            setFormData({
                  title: "",
                  description: "",
                  date: "",
                  location: "",
                  maxParticipants: "",
                  category: "Cleanup",
            });

      const handleSubmit = async () => {
            try {
                  if (type === "create") {
                        await axiosSecure.post("/api/events", formData);
                        Swal.fire("Created!", "Event created successfully", "success");
                  } else {
                        await axiosSecure.patch(`/api/events/${event._id}`, formData);
                        Swal.fire("Updated!", "Event updated successfully", "success");
                  }
                  refreshEvents();
                  closeModal();
                  resetForm();
            } catch (error) {
                  Swal.fire("Error", `Failed to ${type} event`, error);
            }
      };

      return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex justify-between items-center mb-6">
                              <h2 className="text-2xl font-bold">
                                    {type === "create" ? "Create New Event" : "Edit Event"}
                              </h2>
                              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <X size={24} />
                              </button>
                        </div>

                        <div className="space-y-4">
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Event Title *
                                    </label>
                                    <input
                                          type="text"
                                          value={formData.title}
                                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                    />
                              </div>
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Description *
                                    </label>
                                    <textarea
                                          value={formData.description}
                                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                          rows={4}
                                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                    />
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                          <label>Date & Time *</label>
                                          <input
                                                type="datetime-local"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                          />
                                    </div>
                                    <div>
                                          <label>Location *</label>
                                          <input
                                                type="text"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                          />
                                    </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                          <label>Max Participants *</label>
                                          <input
                                                type="number"
                                                min="1"
                                                value={formData.maxParticipants}
                                                onChange={(e) =>
                                                      setFormData({ ...formData, maxParticipants: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                          />
                                    </div>
                                    <div>
                                          <label>Category *</label>
                                          <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                          >
                                                {["Cleanup", "Conservation", "Education", "Recycling", "Other"].map(
                                                      (c) => (
                                                            <option key={c} value={c}>
                                                                  {c}
                                                            </option>
                                                      )
                                                )}
                                          </select>
                                    </div>
                              </div>

                              <div className="flex gap-3 pt-4">
                                    <button
                                          onClick={closeModal}
                                          className="flex-1 px-6 py-3 border text-gray-700 rounded-lg hover:bg-gray-50"
                                    >
                                          Cancel
                                    </button>
                                    <button
                                          onClick={handleSubmit}
                                          className={`flex-1 px-6 py-3 ${
                                                type === "create"
                                                      ? "bg-green-600 hover:bg-green-700"
                                                      : "bg-blue-600 hover:bg-blue-700"
                                          } text-white rounded-lg`}
                                    >
                                          {type === "create" ? "Create Event" : "Update Event"}
                                    </button>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default EventModal;
