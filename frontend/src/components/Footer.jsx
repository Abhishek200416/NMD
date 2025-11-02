import { useState } from "react";
import { Link } from "react-router-dom";
import { useBrand, API } from "@/App";
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";

const Footer = () => {
  const { currentBrand } = useBrand();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !currentBrand) return;

    setLoading(true);
    try {
      await axios.post(`${API}/subscribers`, {
        email,
        brand_id: currentBrand.id,
      });
      toast.success("Successfully subscribed!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentBrand) return null;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4" data-testid="footer-brand-name">
              {currentBrand.name}
            </h3>
            {currentBrand.tagline && (
              <p className="text-gray-400 mb-4">{currentBrand.tagline}</p>
            )}
            {currentBrand.location && (
              <div className="flex items-start space-x-2 mb-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-sm">{currentBrand.location}</span>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/ministries" className="hover:text-white transition-colors">Ministries</Link></li>
              <li><Link to="/announcements" className="hover:text-white transition-colors">Announcements</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Stay Connected</h4>
            <p className="text-sm mb-4">Subscribe to receive updates and announcements</p>
            <form onSubmit={handleSubscribe} className="flex gap-2" data-testid="newsletter-form">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
                data-testid="newsletter-email-input"
              />
              <Button type="submit" disabled={loading} data-testid="newsletter-subscribe-btn">
                Subscribe
              </Button>
            </form>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} {currentBrand.name}. All rights reserved.
          </p>
          <Link to="/admin/login" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
