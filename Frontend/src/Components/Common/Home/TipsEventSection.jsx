import EventCard from "./EventCard";
import TipCard from "./TipCard";

const defaultTips = [
      { id: 1, title: "5 Ways to Upcycle Old T-shirts", author: "Sarah M." },
      { id: 2, title: "Natural Air-Purifying Plants for Your Home", author: "Mike J." },
      { id: 3, title: "Reducing Food Waste: A Beginner's Guide", author: "Emma R." },
];

const defaultEvents = [
      {
            id: 1,
            title: "Community Beach Cleanup",
            date: "Dec 15, 2024 • 9:00 AM",
            location: "Ocean Beach, San Francisco",
            attendees: 45,
      },
      {
            id: 2,
            title: "Farmers Market Meetup",
            date: "Dec 18, 2024 • 10:00 AM",
            location: "Ferry Building",
            attendees: 32,
      },
      {
            id: 3,
            title: "Tree Planting Day",
            date: "Dec 22, 2024 • 8:00 AM",
            location: "Golden Gate Park",
            attendees: 67,
      },
];

const TipsEventsSection = ({ tips, events }) => {
      const displayTips = tips.length > 0 ? tips : defaultTips;
      const displayEvents = events.length > 0 ? events : defaultEvents;

      return (
            <section className="py-16 bg-gray-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                              {/* Latest Community Tips */}
                              <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Latest Community Tips</h2>
                                    <div className="space-y-4">
                                          {displayTips.map((tip, index) => (
                                                <TipCard key={index} tip={tip} index={index} />
                                          ))}
                                    </div>
                              </div>

                              {/* Upcoming Events */}
                              <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
                                    <div className="space-y-4">
                                          {displayEvents.map((event) => (
                                                <EventCard key={event.id} event={event} />
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default TipsEventsSection;
