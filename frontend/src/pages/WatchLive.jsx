import { useState, useEffect } from 'react';
import axios from 'axios';
import { API, useBrand } from '@/App';
import { Loader2, Video, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WatchLive = () => {
  const { currentBrand } = useBrand();
  const [activeStream, setActiveStream] = useState(null);
  const [upcomingStreams, setUpcomingStreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentBrand) {
      loadStreams();
    }
  }, [currentBrand]);

  const loadStreams = async () => {
    setLoading(true);
    try {
      const [activeRes, upcomingRes] = await Promise.all([
        axios.get(`${API}/live-streams/active?brand_id=${currentBrand.id}`),
        axios.get(`${API}/live-streams?brand_id=${currentBrand.id}&is_live=false`)
      ]);

      setActiveStream(activeRes.data);
      setUpcomingStreams(upcomingRes.data);
    } catch (error) {
      console.error('Error loading streams:', error);
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([^&\?]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}?autoplay=1` : url;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin h-8 w-8 text-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <Video className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Watch Live</h1>
          <p className="text-xl opacity-90">Join us for our live service</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {activeStream ? (
          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="aspect-video bg-black">
                <iframe
                  src={getYouTubeEmbedUrl(activeStream.stream_url)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Live Stream"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                    LIVE NOW
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeStream.title}</h2>
                {activeStream.description && (
                  <p className="text-gray-600">{activeStream.description}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Live Stream Right Now</h2>
              <p className="text-gray-600 mb-6">
                Check back during service times or browse our sermon archive below.
              </p>
              <Button onClick={() => window.location.href = '/messages'}>
                View Past Sermons
              </Button>
            </div>
          </div>
        )}

        {/* Upcoming Streams */}
        {upcomingStreams.length > 0 && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingStreams.map((stream) => (
                <div key={stream.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  {stream.thumbnail_url && (
                    <img
                      src={stream.thumbnail_url}
                      alt={stream.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{stream.title}</h3>
                    {stream.description && (
                      <p className="text-gray-600 mb-4 line-clamp-2">{stream.description}</p>
                    )}
                    {stream.scheduled_time && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(stream.scheduled_time).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Service Times */}
        {currentBrand?.service_times && (
          <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
              <div className="flex items-start space-x-4">
                <Clock className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Service Times</h3>
                  <p className="text-gray-700 whitespace-pre-line">{currentBrand.service_times}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchLive;