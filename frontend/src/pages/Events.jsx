import { useState, useEffect } from "react";
import { useBrand, API } from "@/App";
import axios from "axios";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Events = () => {
  const { currentBrand } = useBrand();
  const [events, setEvents] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // list or calendar
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentBrand) {
      loadEvents();
    }
  }, [currentBrand]);

  const loadEvents = async () => {
    try {
      const response = await axios.get(`${API}/events?brand_id=${currentBrand.id}`);
      setEvents(response.data.sort((a, b) => new Date(a.date) - new Date(b.date)));
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

  if (!currentBrand) return null;

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-testid="events-page-title">
            Events
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for our upcoming events and connect with our community
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="section bg-white">
        <div className="container max-w-5xl">
          {loading ? (
            <div className="text-center py-12">Loading events...</div>
          ) : (
            <>
              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold mb-8" data-testid="upcoming-events-section-title">Upcoming Events</h2>
                  <div className="space-y-6">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="card flex flex-col md:flex-row overflow-hidden" data-testid={`event-detail-${event.id}`}>
                        {event.image_url && (
                          <img src={event.image_url} alt={event.title} className="w-full md:w-64 h-48 object-cover" />
                        )}
                        <div className="card-content flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-2xl font-semibold">{event.title}</h3>
                            {event.is_free && (
                              <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                                Free
                              </span>
                            )}
                          </div>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-gray-600 text-sm">
                              <Calendar size={16} className="mr-2" />
                              {new Date(event.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                            {event.time && (
                              <div className="flex items-center text-gray-600 text-sm">
                                <Clock size={16} className="mr-2" />
                                {event.time}
                              </div>
                            )}
                            <div className="flex items-center text-gray-600 text-sm">
                              <MapPin size={16} className="mr-2" />
                              {event.location}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{event.description}</p>
                          {event.is_free && (
                            <Button data-testid={`register-event-btn-${event.id}`}>Register Now</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8" data-testid="past-events-section-title">Past Events</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {pastEvents.map((event) => (
                      <div key={event.id} className="card opacity-75" data-testid={`past-event-${event.id}`}>
                        {event.image_url && (
                          <img src={event.image_url} alt={event.title} className="card-image" />
                        )}
                        <div className="card-content">
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          <div className="flex items-center text-gray-600 text-sm mb-2">
                            <Calendar size={16} className="mr-2" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {events.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No events scheduled at this time. Check back soon!</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
