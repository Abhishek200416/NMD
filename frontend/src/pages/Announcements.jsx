import { useState, useEffect } from "react";
import { useBrand, API } from "@/App";
import axios from "axios";
import { Calendar } from "lucide-react";

const Announcements = () => {
  const { currentBrand } = useBrand();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    if (currentBrand) {
      loadAnnouncements();
    }
  }, [currentBrand]);

  const loadAnnouncements = async () => {
    try {
      const response = await axios.get(`${API}/announcements?brand_id=${currentBrand.id}`);
      setAnnouncements(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
      console.error("Error loading announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentBrand) return null;

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-testid="announcements-page-title">
            Announcements
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news and announcements
          </p>
        </div>
      </section>

      {/* Announcements List */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          {loading ? (
            <div className="text-center py-12">Loading announcements...</div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No announcements at this time.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="card cursor-pointer"
                  onClick={() => setSelectedAnnouncement(announcement)}
                  data-testid={`announcement-card-${announcement.id}`}
                >
                  <div className="card-content">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-semibold flex-1">{announcement.title}</h3>
                      {announcement.is_urgent && (
                        <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full ml-2">
                          Urgent
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar size={14} className="mr-2" />
                      {new Date(announcement.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <p className="text-gray-700 line-clamp-3">{announcement.content}</p>
                    <p className="text-blue-600 text-sm mt-3 font-medium">Read more →</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" data-testid="announcement-detail-modal">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-3xl font-bold flex-1">{selectedAnnouncement.title}</h2>
              {selectedAnnouncement.is_urgent && (
                <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full ml-2">
                  Urgent
                </span>
              )}
            </div>
            <div className="flex items-center text-gray-500 text-sm mb-6">
              <Calendar size={14} className="mr-2" />
              {new Date(selectedAnnouncement.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedAnnouncement.content}</p>
            </div>
            <button
              onClick={() => setSelectedAnnouncement(null)}
              className="btn btn-primary"
              data-testid="close-announcement-detail-btn"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
