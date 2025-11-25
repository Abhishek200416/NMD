import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useBrand } from "@/App";
import { Menu, X, ExternalLink, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Header = () => {
  const { currentBrand } = useBrand();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setMobileMenuOpen(false);
  }, [location]);

  // Corporate navigation links - clean and professional
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/ministries", label: "Ministries" },
    { path: "/events", label: "Events" },
    { path: "/foundations", label: "Foundations" },
    { path: "/books", label: "Books" },
    { 
      path: "https://faithcentre.in", 
      label: "Faith Centre", 
      external: true 
    },
    { path: "/giving", label: "Give", highlight: true },
    { path: "/contact", label: "Contact" }
  ];

  const mobileNavLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/ministries", label: "Ministries" },
    { path: "/events", label: "Events" },
    { path: "/foundations", label: "Foundations" },
    { path: "/books", label: "Books" },
    { 
      path: "https://faithcentre.in", 
      label: "Faith Centre", 
      external: true 
    },
    { path: "/giving", label: "Give" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/prayer-wall", label: "Prayer" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" }
  ];

  const isActive = (path) => location.pathname === path;

  if (!currentBrand) return null;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b transition-all duration-300 ${
          scrolled ? 'border-gray-300 shadow-lg' : 'border-gray-200 shadow-md'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left Section: Logo */}
            <Link 
              to="/" 
              className="flex items-center transition-all hover:opacity-80 relative z-50 flex-shrink-0" 
              data-testid="header-logo"
            >
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                {currentBrand.name}
              </div>
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.external) {
                  return (
                    <a
                      key={link.path}
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-md font-medium text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 whitespace-nowrap flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink size={14} />
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                      link.highlight
                        ? "bg-slate-900 text-white hover:bg-slate-700 shadow-md"
                        : isActive(link.path)
                        ? "bg-slate-800 text-white"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Section: Social Media + Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Social Media Links - Desktop */}
              <div className="hidden lg:flex items-center gap-2">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-all"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 text-gray-600 hover:text-pink-600 hover:bg-gray-100 rounded-md transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-md transition-all"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
              </div>

              {/* Hamburger Menu Button */}
              <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-all text-gray-900 relative z-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="mobile-menu-toggle"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16 lg:h-20" aria-hidden="true" />

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-[45] lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <nav
        className={`fixed top-16 left-0 right-0 bg-white z-[48] lg:hidden border-b border-gray-200 shadow-xl transition-all duration-300 ease-out ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        data-testid="mobile-menu"
        aria-label="Mobile navigation"
      >
        <div className="container mx-auto px-4 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Social Media in Mobile Menu */}
          <div className="flex items-center justify-center gap-4 pb-4 mb-4 border-b border-gray-200 lg:hidden">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-all"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 text-gray-600 hover:text-pink-600 hover:bg-gray-100 rounded-md transition-all"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-md transition-all"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
          </div>

          {/* Mobile Navigation Links */}
          {mobileNavLinks.map((link, index) => {
            if (link.external) {
              return (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 30}ms` }}
                  className={`block px-4 py-3.5 font-medium rounded-md transition-all duration-200 mb-2 min-h-[48px] flex items-center justify-between text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                    mobileMenuOpen ? 'animate-slideIn' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  <ExternalLink size={16} />
                </a>
              );
            }
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 30}ms` }}
                className={`block px-4 py-3.5 font-medium rounded-md transition-all duration-200 mb-2 min-h-[48px] flex items-center ${
                  isActive(link.path)
                    ? "bg-gray-800 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                } ${mobileMenuOpen ? 'animate-slideIn' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Header;