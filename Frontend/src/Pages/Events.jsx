import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/RootContext";
import useAxios from "../Hooks/useAxios.jsx";
import useAxiosSecure from "../Hooks/useAxiosSecure.jsx";
import FilterBar from "../Components/Layout/FilterBar.jsx";
import { EventsListSkeleton } from "../Components/Utils/SkeletonLoader.jsx";
import EventCard from "../Components/Layout/EventCard.jsx";
import EventModal from "../Components/Layout/EventModal.jsx";
import Swal from "sweetalert2";

const Events = () => {
      const { user } = useContext(AuthContext);
      const axios = useAxios();
      const axiosSecure = useAxiosSecure();

      const [events, setEvents] = useState([]);
      const [filteredEvents, setFilteredEvents] = useState([]);
      const [loading, setLoading] = useState(true);
      const [showCreateModal, setShowCreateModal] = useState(false);
      const [showEditModal, setShowEditModal] = useState(false);
      const [selectedEvent, setSelectedEvent] = useState(null);
      const [filter, setFilter] = useState("all");
      const [searchTerm, setSearchTerm] = useState("");

      // Add formData state and resetForm function
      const [formData, setFormData] = useState({
            title: "",
            description: "",
            date: "",
            location: "",
            maxParticipants: "",
            category: "Cleanup",
      });

      useEffect(() => {
            fetchEvents();
      }, []);
      useEffect(() => {
            filterEvents();
      }, [events, filter, searchTerm]);

      const fetchEvents = async () => {
            try {
                  setLoading(true);
                  const response = await axios.get("/api/events");
                  setEvents(response.data);
            } catch (error) {
                  console.error(error);
            } finally {
                  setLoading(false);
            }
      };

      const filterEvents = () => {
            let filtered = [...events];
            const now = new Date();

            if (filter === "upcoming") filtered = filtered.filter((e) => new Date(e.date) >= now);
            if (filter === "past") filtered = filtered.filter((e) => new Date(e.date) < now);

            if (searchTerm) {
                  filtered = filtered.filter(
                        (e) =>
                              e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              e.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              e.description.toLowerCase().includes(searchTerm.toLowerCase())
                  );
            }

            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
            setFilteredEvents(filtered);
      };

      // Add resetForm function
      const resetForm = () => {
            setFormData({
                  title: "",
                  description: "",
                  date: "",
                  location: "",
                  maxParticipants: "",
                  category: "Cleanup",
            });
            setSelectedEvent(null);
      };

      // Add showNotification function
      const showNotification = (icon, title) => {
            Swal.fire({
                  icon,
                  title,
                  showConfirmButton: false,
                  timer: 2000,
                  toast: true,
                  position: "top-end",
            });
      };

      // Add handleUpdateEvent function
      const handleUpdateEvent = async () => {
            try {
                  await axiosSecure.patch(`/api/events/${selectedEvent._id}`, formData);
                  setShowEditModal(false);
                  resetForm();
                  fetchEvents();
                  showNotification("success", "Event updated successfully!");
            } catch (error) {
                  console.error("Error updating event:", error);
                  showNotification("error", "Failed to update event");
            }
      };

      // Add handleDeleteEvent function
      const handleDeleteEvent = async (eventId) => {
            const result = await Swal.fire({
                  title: "Are you sure?",
                  text: "This will permanently delete the event!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                  try {
                        await axiosSecure.delete(`/api/events/${eventId}`);
                        fetchEvents();
                        showNotification("success", "Event deleted successfully!");
                  } catch (error) {
                        console.error("Error deleting event:", error);
                        showNotification("error", "Failed to delete event");
                  }
            }
      };

      // Add handleJoinEvent function
      const handleJoinEvent = async (eventId) => {
            try {
                  await axiosSecure.post(`/api/events/join/${eventId}`);
                  fetchEvents();
                  showNotification("success", "Successfully joined the event!");
            } catch (error) {
                  console.error("Error joining event:", error);
                  showNotification("error", error.response?.data?.message || "Failed to join event");
            }
      };

      return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 sm:p-6 lg:p-8">
                  {" "}
                  {/* Fixed gradient syntax */}
                  <div className="max-w-7xl mx-auto">
                        <FilterBar
                              searchTerm={searchTerm}
                              setSearchTerm={setSearchTerm}
                              filter={filter}
                              setFilter={setFilter}
                              openCreateModal={() => setShowCreateModal(true)}
                        />

                        {loading ? (
                              <EventsListSkeleton count={6} />
                        ) : filteredEvents.length === 0 ? (
                              <div className="text-center py-12 text-gray-500">No events found</div>
                        ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredEvents.map((event) => (
                                          <EventCard
                                                key={event._id}
                                                event={event}
                                                user={user}
                                                axiosSecure={axiosSecure}
                                                openEditModal={() => {
                                                      setSelectedEvent(event);
                                                      setShowEditModal(true);
                                                }}
                                                refreshEvents={fetchEvents}
                                                handleDeleteEvent={handleDeleteEvent}
                                                handleJoinEvent={handleJoinEvent}
                                          />
                                    ))}
                              </div>
                        )}

                        {showCreateModal && (
                              <EventModal
                                    type="create"
                                    closeModal={() => setShowCreateModal(false)}
                                    refreshEvents={fetchEvents}
                                    axiosSecure={axiosSecure}
                              />
                        )}

                        {showEditModal && selectedEvent && (
                              <EventModal
                                    type="edit"
                                    event={selectedEvent}
                                    closeModal={() => {
                                          setShowEditModal(false);
                                          setSelectedEvent(null);
                                    }}
                                    refreshEvents={fetchEvents}
                                    axiosSecure={axiosSecure}
                                    formData={formData}
                                    setFormData={setFormData}
                                    handleUpdateEvent={handleUpdateEvent}
                              />
                        )}
                  </div>
            </div>
      );
};

export default Events;
