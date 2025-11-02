import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBrand, API } from "@/App";
import axios from "axios";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { currentBrand } = useBrand();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [ministries, setMinistries] = useState([]);
  const [urgentAnnouncement, setUrgentAnnouncement] = useState(null);
  const [showUrgentModal, setShowUrgentModal] = useState(false);

  useEffect(() => {
    if (currentBrand) {
      loadData();
      checkUrgentAnnouncements();
    }
  }, [currentBrand]);

  const loadData = async () => {
    try {
      const [eventsRes, announcementsRes, ministriesRes] = await Promise.all([
        axios.get(`${API}/events?brand_id=${currentBrand.id}`),
        axios.get(`${API}/announcements?brand_id=${currentBrand.id}`),
        axios.get(`${API}/ministries?brand_id=${currentBrand.id}`),
      ]);

      setEvents(eventsRes.data.slice(0, 3));
      setAnnouncements(announcementsRes.data.slice(0, 2));
      setMinistries(ministriesRes.data.slice(0, 3));
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const checkUrgentAnnouncements = async () => {
    try {
      const response = await axios.get(`${API}/announcements/urgent?brand_id=${currentBrand.id}`);
      if (response.data.length > 0) {
        const hasSeenKey = `seen_urgent_${response.data[0].id}`;
        if (!sessionStorage.getItem(hasSeenKey)) {
          setUrgentAnnouncement(response.data[0]);
          setShowUrgentModal(true);
        }
      }
    } catch (error) {
      console.error("Error checking urgent announcements:", error);
    }
  };

  const closeUrgentModal = () => {
    if (urgentAnnouncement) {
      sessionStorage.setItem(`seen_urgent_${urgentAnnouncement.id}`, "true");
    }
    setShowUrgentModal(false);
  };

  if (!currentBrand) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" data-testid="hero-section">
        {currentBrand.hero_video_url ? (
          <video autoPlay loop muted playsInline className="hero-video">
            <source src={currentBrand.hero_video_url} type="video/mp4" />
          </video>
        ) : currentBrand.hero_image_url ? (
          <img src={currentBrand.hero_image_url} alt="Hero" className="hero-video" />
        ) : null}
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-testid="hero-title">
            {currentBrand.tagline || `Welcome to ${currentBrand.name}`}
          </h1>
          {currentBrand.service_times && (
            <div className="bg-white/90 backdrop-blur-sm text-gray-900 rounded-lg p-6 mb-6 inline-block">
              <div className="flex items-center justify-center space-x-3">
                <Clock size={24} />
                <div className="text-left">
                  <p className="font-semibold text-lg">Service Times</p>
                  <p className="text-base">{currentBrand.service_times}</p>
                </div>
              </div>
              {currentBrand.location && (
                <div className="flex items-center justify-center space-x-3 mt-3 pt-3 border-t">
                  <MapPin size={24} />
                  <p className="text-sm">{currentBrand.location}</p>
                </div>
              )}
            </div>
          )}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="rounded-full" onClick={() => navigate("/events")} data-testid="cta-join-sunday">
              Join Us This Sunday
            </Button>
            <Button size="lg" variant="outline" className="rounded-full bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-gray-900" onClick={() => navigate("/about")} data-testid="cta-learn-more">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold" data-testid="upcoming-events-title">Upcoming Events</h2>
              <Button variant="ghost" onClick={() => navigate("/events")} data-testid="view-all-events-btn">
                View All
              </Button>
            </div>
            <div className="card-grid">
              {events.map((event) => (
                <div key={event.id} className="card" data-testid={`event-card-${event.id}`}>
                  {event.image_url && (
                    <img src={event.image_url} alt={event.title} className="card-image" />
                  )}
                  <div className="card-content">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <Calendar size={16} className="mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    {event.time && (
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <Clock size={16} className="mr-2" />
                        {event.time}
                      </div>
                    )}
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <MapPin size={16} className="mr-2" />
                      {event.location}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ministries Preview */}
      {ministries.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold" data-testid="ministries-title">Get Involved</h2>
              <Button variant="ghost" onClick={() => navigate("/ministries")} data-testid="view-all-ministries-btn">
                View All
              </Button>
            </div>
            <div className="card-grid">
              {ministries.map((ministry) => (
                <div key={ministry.id} className="card" data-testid={`ministry-card-${ministry.id}`}>
                  {ministry.image_url && (
                    <img src={ministry.image_url} alt={ministry.title} className="card-image" />
                  )}
                  <div className="card-content">
                    <h3 className="text-xl font-semibold mb-2">{ministry.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{ministry.description}</p>
                    <Button size="sm" onClick={() => navigate("/ministries")} data-testid={`join-ministry-btn-${ministry.id}`}>
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Announcements Preview */}
      {announcements.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold" data-testid="announcements-title">Latest Announcements</h2>
              <Button variant="ghost" onClick={() => navigate("/announcements")} data-testid="view-all-announcements-btn">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => navigate("/announcements")} data-testid={`announcement-preview-${announcement.id}`}>
                  <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{announcement.content}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(announcement.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Urgent Announcement Modal */}
      {showUrgentModal && urgentAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" data-testid="urgent-announcement-modal">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-2xl font-bold mb-4">Important Announcement</h3>
            <h4 className="text-lg font-semibold mb-2">{urgentAnnouncement.title}</h4>
            <p className="text-gray-700 mb-6 whitespace-pre-wrap">{urgentAnnouncement.content}</p>
            <Button onClick={closeUrgentModal} className="w-full" data-testid="close-urgent-modal-btn">
              Got it
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
