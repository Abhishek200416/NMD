import { useState, useEffect } from "react";
import { useBrand, API } from "@/App";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";

const PrayerWall = () => {
  const { currentBrand } = useBrand();
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    request: "",
    is_anonymous: false,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentBrand) {
      loadPrayers();
    }
  }, [currentBrand]);

  const loadPrayers = async () => {
    try {
      const response = await axios.get(`${API}/prayer-requests/public?brand_id=${currentBrand.id}`);
      setPrayers(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
      console.error("Error loading prayers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentBrand) return;

    setSubmitting(true);
    try {
      await axios.post(`${API}/prayer-requests`, {
        ...formData,
        brand_id: currentBrand.id,
      });
      toast.success("Prayer request submitted! Our community will be praying for you.");
      setShowForm(false);
      setFormData({
        name: "",
        email: "",
        request: "",
        is_anonymous: false,
      });
      if (!formData.is_anonymous) {
        loadPrayers();
      }
    } catch (error) {
      toast.error("Failed to submit prayer request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!currentBrand) return null;

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-testid="prayer-wall-title">
            Prayer Wall
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Share your prayer requests and join us in prayer
          </p>
          <Button size="lg" onClick={() => setShowForm(true)} data-testid="submit-prayer-btn">
            Submit Prayer Request
          </Button>
        </div>
      </section>

      {/* Prayer Requests */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          {loading ? (
            <div className="text-center py-12">Loading prayer requests...</div>
          ) : prayers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No public prayer requests yet. Be the first to share!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {prayers.map((prayer) => (
                <div key={prayer.id} className="bg-gray-50 rounded-lg p-6" data-testid={`prayer-card-${prayer.id}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{prayer.name}</h3>
                      <p className="text-gray-700 whitespace-pre-wrap">{prayer.request}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(prayer.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Prayer Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" data-testid="prayer-form-modal">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Submit Prayer Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  data-testid="prayer-name-input"
                />
              </div>
              <div>
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  data-testid="prayer-email-input"
                />
              </div>
              <div>
                <Label htmlFor="request">Prayer Request *</Label>
                <Textarea
                  id="request"
                  rows={6}
                  value={formData.request}
                  onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                  required
                  placeholder="Share your prayer need..."
                  data-testid="prayer-request-input"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_anonymous"
                  checked={formData.is_anonymous}
                  onChange={(e) => setFormData({ ...formData, is_anonymous: e.target.checked })}
                  data-testid="prayer-anonymous-checkbox"
                />
                <Label htmlFor="is_anonymous" className="mb-0">
                  Keep my request anonymous (won't appear on prayer wall)
                </Label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={submitting} className="flex-1" data-testid="prayer-submit-btn">
                  {submitting ? "Submitting..." : "Submit Request"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="flex-1" data-testid="prayer-cancel-btn">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrayerWall;
