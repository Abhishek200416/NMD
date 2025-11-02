import { useState, useEffect } from "react";
import { useBrand, API } from "@/App";
import axios from "axios";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const { currentBrand } = useBrand();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentBrand) {
      loadTestimonials();
    }
  }, [currentBrand]);

  const loadTestimonials = async () => {
    try {
      const response = await axios.get(`${API}/testimonials?brand_id=${currentBrand.id}`);
      setTestimonials(response.data.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.created_at) - new Date(a.created_at);
      }));
    } catch (error) {
      console.error("Error loading testimonials:", error);
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-testid="testimonials-page-title">
            Testimonials
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Stories of lives transformed by faith
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section bg-white">
        <div className="container">
          {loading ? (
            <div className="text-center py-12">Loading testimonials...</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No testimonials available at this time.</p>
            </div>
          ) : (
            <div className="card-grid">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`card ${testimonial.featured ? "border-2 border-blue-500" : ""}`}
                  data-testid={`testimonial-card-${testimonial.id}`}
                >
                  <div className="card-content">
                    {testimonial.featured && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-3">
                        Featured
                      </span>
                    )}
                    <Quote size={32} className="text-gray-300 mb-3" />
                    <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      {testimonial.image_url ? (
                        <img
                          src={testimonial.image_url}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-semibold">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(testimonial.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
