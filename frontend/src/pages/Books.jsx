import { useState } from 'react';
import { BookOpen, ShoppingCart, ExternalLink } from 'lucide-react';
import SEO from '@/components/SEO';

const Books = () => {
  const books = [
    {
      id: 1,
      title: "Faith & Purpose",
      author: "Nehemiah David",
      description: "Discover God's purpose for your life through practical biblical teachings and real-life examples.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
      price: "$19.99",
      buyLink: "#"
    },
    {
      id: 2,
      title: "Building Strong Foundations",
      author: "Nehemiah David",
      description: "A comprehensive guide to establishing unshakeable spiritual foundations in your walk with Christ.",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
      price: "$24.99",
      buyLink: "#"
    },
    {
      id: 3,
      title: "Power of Prayer",
      author: "Prathibha David",
      description: "Learn the transformative power of prayer and how to develop a deeper connection with God.",
      image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&q=80",
      price: "$16.99",
      buyLink: "#"
    },
    {
      id: 4,
      title: "Leading with Grace",
      author: "Nehemiah David",
      description: "Principles of servant leadership based on biblical teachings and modern ministry practices.",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80",
      price: "$21.99",
      buyLink: "#"
    }
  ];

  return (
    <>
      <SEO 
        title="Books - Nehemiah David Ministries"
        description="Explore inspiring books and resources by Nehemiah David and ministry leaders"
      />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-blue-300" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ministry Books & Resources
            </h1>
            <p className="text-xl text-gray-200">
              Deepen your faith and grow spiritually with our collection of inspiring books and teaching resources
            </p>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {books.map((book) => (
                <div 
                  key={book.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
                    <p className="text-gray-700 mb-4 flex-1 line-clamp-3">{book.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-2xl font-bold text-blue-900">{book.price}</span>
                      <button
                        onClick={() => window.open(book.buyLink, '_blank')}
                        className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <ShoppingCart size={16} />
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coming Soon Section */}
            <div className="mt-16 text-center bg-white rounded-lg shadow-md p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">More Resources Coming Soon</h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                We're constantly working on new books, study guides, and teaching materials to help you grow in your faith journey.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Request a Topic
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
