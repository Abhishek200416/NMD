import { useState, useEffect } from "react";
import { useBrand, API } from "@/App";
import axios from "axios";
import { Play, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Messages = () => {
  const { currentBrand } = useBrand();
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSermon, setSelectedSermon] = useState(null);

  useEffect(() => {
    if (currentBrand) {
      loadSermons();
    }
  }, [currentBrand]);

  const loadSermons = async () => {
    try {
      const response = await axios.get(`${API}/sermons?brand_id=${currentBrand.id}`);
      setSermons(response.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      console.error("Error loading sermons:", error);
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-testid="messages-page-title">
            Messages
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Watch and listen to our latest messages and sermons
          </p>
        </div>
      </section>

      {/* Sermons Grid */}
      <section className="section bg-white">
        <div className="container">
          {loading ? (
            <div className="text-center py-12">Loading messages...</div>
          ) : sermons.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No messages available at this time.</p>
            </div>
          ) : (
            <div className="card-grid">
              {sermons.map((sermon) => (
                <div
                  key={sermon.id}
                  className="card cursor-pointer"
                  onClick={() => setSelectedSermon(sermon)}
                  data-testid={`sermon-card-${sermon.id}`}
                >
                  {sermon.thumbnail_url ? (
                    <div className="relative">
                      <img src={sermon.thumbnail_url} alt={sermon.title} className="card-image" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                          <Play size={24} className="text-gray-900 ml-1" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <Play size={48} className="text-gray-600" />
                    </div>
                  )}
                  <div className="card-content">
                    <h3 className="text-xl font-semibold mb-2">{sermon.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <User size={14} className="mr-2" />
                      {sermon.speaker}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <Calendar size={14} className="mr-2" />
                      {new Date(sermon.date).toLocaleDateString()}
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-2">{sermon.description}</p>
                    <div className="mt-3">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {sermon.media_type === "video" ? "Video" : "Audio"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sermon Player Modal */}
      {selectedSermon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" data-testid="sermon-player-modal">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {selectedSermon.media_type === "video" ? (
                selectedSermon.media_url.includes('youtube.com') || selectedSermon.media_url.includes('youtu.be') ? (
                  <div className="aspect-video mb-4">
                    <iframe
                      src={selectedSermon.media_url.includes('embed') 
                        ? selectedSermon.media_url 
                        : `https://www.youtube.com/embed/${selectedSermon.media_url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([^&\?]+)/)?.[1]}`}
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={selectedSermon.title}
                    />
                  </div>
                ) : (
                  <video controls className="w-full rounded-lg mb-4" autoPlay>
                    <source src={selectedSermon.media_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <audio controls className="w-full mb-4" autoPlay>
                  <source src={selectedSermon.media_url} type="audio/mp3" />
                  Your browser does not support the audio tag.
                </audio>
              )}
              
              <h2 className="text-3xl font-bold mb-2">{selectedSermon.title}</h2>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  {selectedSermon.speaker}
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {new Date(selectedSermon.date).toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-700 mb-6">{selectedSermon.description}</p>
              
              {selectedSermon.transcript && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold mb-2">Transcript</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedSermon.transcript}</p>
                </div>
              )}
              
              <Button onClick={() => setSelectedSermon(null)} className="w-full" data-testid="close-sermon-modal-btn">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
