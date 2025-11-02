import { useState, useEffect } from "react";
import { useBrand, API } from "@/App";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Ministries = () => {
  const { currentBrand } = useBrand();
  const [ministries, setMinistries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [selectedMinistry, setSelectedMinistry] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    ministry: "",
    availability: "",
    skills: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentBrand) {
      loadMinistries();
    }
  }, [currentBrand]);

  const loadMinistries = async () => {
    try {
      const response = await axios.get(`${API}/ministries?brand_id=${currentBrand.id}`);
      setMinistries(response.data);
    } catch (error) {
      console.error("Error loading ministries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClick = (ministry) => {
    setSelectedMinistry(ministry.title);
    setFormData({ ...formData, ministry: ministry.title });
    setShowJoinForm(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post(`${API}/volunteers`, {
        ...formData,
        brand_id: currentBrand.id,
      });
      toast.success("Application submitted successfully! We'll be in touch soon.");
      setShowJoinForm(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        ministry: "",
        availability: "",
        skills: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-testid="ministries-page-title">
            Ministries
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover ways to serve and connect with others through our various ministry teams
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="section bg-white">
        <div className="container">
          {loading ? (
            <div className="text-center py-12">Loading ministries...</div>
          ) : ministries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No ministries available at this time.</p>
            </div>
          ) : (
            <div className="card-grid">
              {ministries.map((ministry) => (
                <div key={ministry.id} className="card" data-testid={`ministry-detail-${ministry.id}`}>
                  {ministry.image_url && (
                    <img src={ministry.image_url} alt={ministry.title} className="card-image" />
                  )}
                  <div className="card-content">
                    <h3 className="text-2xl font-semibold mb-3">{ministry.title}</h3>
                    <p className="text-gray-700 mb-6">{ministry.description}</p>
                    <Button onClick={() => handleJoinClick(ministry)} data-testid={`join-ministry-form-btn-${ministry.id}`}>
                      Join This Ministry
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join Form Modal */}
      {showJoinForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" data-testid="volunteer-form-modal">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Join {selectedMinistry}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  data-testid="volunteer-name-input"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  data-testid="volunteer-email-input"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  data-testid="volunteer-phone-input"
                />
              </div>
              <div>
                <Label htmlFor="availability">Availability *</Label>
                <Input
                  id="availability"
                  name="availability"
                  placeholder="e.g., Sundays, Weekdays, Evenings"
                  value={formData.availability}
                  onChange={handleInputChange}
                  required
                  data-testid="volunteer-availability-input"
                />
              </div>
              <div>
                <Label htmlFor="skills">Skills/Experience (Optional)</Label>
                <Input
                  id="skills"
                  name="skills"
                  placeholder="Any relevant skills or experience"
                  value={formData.skills}
                  onChange={handleInputChange}
                  data-testid="volunteer-skills-input"
                />
              </div>
              <div>
                <Label htmlFor="message">Why do you want to join this ministry? (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  data-testid="volunteer-message-input"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={submitting} className="flex-1" data-testid="volunteer-submit-btn">
                  {submitting ? "Submitting..." : "Submit Application"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowJoinForm(false)} className="flex-1" data-testid="volunteer-cancel-btn">
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

export default Ministries;
