import { useState, useEffect, useMemo } from "react";
import { useBrand, API } from "@/App";
import axios from "axios";
import { Play, Calendar, ExternalLink, Youtube, Loader2, Search, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const Messages = () => {
  const { currentBrand } = useBrand();
  const [sermons, setSermons] = useState([]);
  const [faithCenterVideos, setFaithCenterVideos] = useState([]);
  const [nehemiahVideos, setNehemiahVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeChannelTab, setActiveChannelTab] = useState("faithcenter"); // "faithcenter" or "nehemiah"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (currentBrand) {
      loadSermons();
      loadAllYoutubeVideos();
    }
  }, [currentBrand]);

  const loadSermons = async () => {
    try {
      const response = await axios.get(`${API}/sermons?brand_id=${currentBrand.id}`);
      setSermons(response.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      console.error("Error loading sermons:", error);
    }
  };

  const loadAllYoutubeVideos = async () => {
    setLoading(true);
    try {
      // Load videos from both channels
      const [faithResponse, nehemiahResponse] = await Promise.all([
        axios.get(`${API}/youtube/channel/@faithcenter_in`),
        axios.get(`${API}/youtube/channel/@nehemiahdavid`)
      ]);
      
      setFaithCenterVideos(faithResponse.data);
      setNehemiahVideos(nehemiahResponse.data);
    } catch (error) {
      console.error("Error loading YouTube videos:", error);
      setFaithCenterVideos([]);
      setNehemiahVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const openYoutubeVideo = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const openYoutubeChannel = (channel) => {
    const channelUrl = channel === "faithcenter" 
      ? "https://youtube.com/@faithcenter_in"
      : "https://youtube.com/@nehemiahdavid";
    window.open(channelUrl, '_blank');
  };

  // Get current channel videos
  const currentVideos = activeChannelTab === "faithcenter" ? faithCenterVideos : nehemiahVideos;
  
  // Filter and search videos
  const filteredVideos = useMemo(() => {
    let videos = currentVideos;
    
    // Filter by category
    if (selectedCategory !== "all") {
      videos = videos.filter(v => v.category === selectedCategory);
    }
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      videos = videos.filter(v => 
        v.title.toLowerCase().includes(query) ||
        v.description.toLowerCase().includes(query)
      );
    }
    
    return videos;
  }, [currentVideos, selectedCategory, searchQuery]);

  // Get unique categories from current videos
  const categories = useMemo(() => {
    const cats = new Set(currentVideos.map(v => v.category));
    return ["all", ...Array.from(cats)];
  }, [currentVideos]);

  // Group filtered videos by category
  const groupedVideos = useMemo(() => {
    return filteredVideos.reduce((acc, video) => {
      const category = video.category || "Other Messages";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(video);
      return acc;
    }, {});
  }, [filteredVideos]);

  if (!currentBrand) return null;

  return (
    <div className="transition-all duration-500">
      {/* Hero Header */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920" 
            alt="Messages" 
            className="w-full h-full object-cover opacity-60 transition-opacity duration-700" 
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 transition-all duration-500" />
        
        <div className="relative z-10 text-center text-white max-w-4xl px-4 sm:px-6">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white transition-all duration-500" 
            style={{
              animation: 'fadeInUp 0.8s ease-out 0.2s backwards', 
              textShadow: '1px 1px 3px rgba(0,0,0,0.5), 0 0 10px rgba(0,0,0,0.3)', 
              color: '#FFFFFF'
            }}
            data-testid="messages-page-title"
          >
            Messages & Sermons
          </h1>
          <p 
            className="text-lg sm:text-xl max-w-2xl mx-auto text-white transition-all duration-500" 
            style={{
              animation: 'fadeInUp 0.8s ease-out 0.4s backwards', 
              textShadow: '1px 1px 2px rgba(0,0,0,0.4)', 
              color: '#FFFFFF'
            }}
          >
            Watch and listen to our latest messages and sermons from our YouTube channel
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200">
        <div className="container">
          <div className="flex gap-4 py-4">
            <button
              onClick={() => setActiveTab("youtube")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "youtube"
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Youtube className="inline mr-2" size={20} />
              YouTube Channel
            </button>
            <button
              onClick={() => setActiveTab("database")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "database"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Play className="inline mr-2" size={20} />
              Archive
            </button>
          </div>
        </div>
      </section>

      {/* YouTube Videos Tab */}
      {activeTab === "youtube" && (
        <section className="section bg-white">
          <div className="container">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="animate-spin h-12 w-12 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-600">Loading videos from YouTube...</p>
              </div>
            ) : Object.keys(groupedVideos).length === 0 ? (
              <div className="text-center py-12">
                <Youtube size={64} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 text-lg mb-4">No videos available at this time.</p>
                <Button 
                  onClick={() => window.open('https://youtube.com/@faithcenter_in', '_blank')}
                  className="transition-all duration-300 hover:scale-105"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Visit Our YouTube Channel
                </Button>
              </div>
            ) : (
              <>
                {Object.entries(groupedVideos).map(([category, videos]) => (
                  <div key={category} className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">{category}</h2>
                    <div className="card-grid">
                      {videos.map((video, index) => (
                        <div
                          key={video.id || video.videoId}
                          className="card group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                          onClick={() => openYoutubeVideo(video.videoId)}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="relative overflow-hidden">
                            <img 
                              src={video.thumbnail || `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`} 
                              alt={video.title} 
                              className="card-image group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all duration-300">
                              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Play size={24} className="text-white ml-1" fill="white" />
                              </div>
                            </div>
                          </div>
                          <div className="card-content">
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">{video.title}</h3>
                            <div className="flex items-center text-gray-600 text-sm mb-3">
                              <Calendar size={14} className="mr-2" />
                              {new Date(video.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                            <p className="text-gray-700 text-sm line-clamp-2 mb-3">{video.description}</p>
                            <Button 
                              size="sm" 
                              className="w-full bg-red-600 hover:bg-red-700 transition-all duration-300 hover:scale-105"
                              onClick={(e) => {
                                e.stopPropagation();
                                openYoutubeVideo(video.videoId);
                              }}
                            >
                              <ExternalLink size={14} className="mr-2" />
                              Watch on YouTube
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Link to Full Channel */}
                <div className="text-center py-8">
                  <Button 
                    size="lg"
                    onClick={() => window.open('https://youtube.com/@faithcenter_in', '_blank')}
                    className="bg-red-600 hover:bg-red-700 transition-all duration-300 hover:scale-105"
                  >
                    <Youtube size={20} className="mr-2" />
                    View All Videos on YouTube
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Database Sermons Tab */}
      {activeTab === "database" && (
        <section className="section bg-white">
          <div className="container">
            {sermons.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No archived messages available at this time.</p>
              </div>
            ) : (
              <div className="card-grid">
                {sermons.map((sermon, index) => (
                  <div
                    key={sermon.id}
                    className="card cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    onClick={() => setSelectedSermon(sermon)}
                    data-testid={`sermon-card-${sermon.id}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {sermon.thumbnail_url ? (
                      <div className="relative overflow-hidden">
                        <img src={sermon.thumbnail_url} alt={sermon.title} className="card-image transition-transform duration-500 hover:scale-110" />
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
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">{sermon.title}</h3>
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
      )}

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
