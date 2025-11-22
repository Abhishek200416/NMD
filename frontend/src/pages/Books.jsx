import { useState } from 'react';
import { BookOpen, ShoppingCart, ExternalLink, Download, Star } from 'lucide-react';
import SEO from '@/components/SEO';

const Books = () => {
  const books = [
    {
      id: 1,
      title: "Imparting Faith",
      subtitle: "Building a Strong Foundation in Christ",
      author: "Nehemiah David",
      description: "A comprehensive guide to understanding and applying biblical principles for building unshakeable faith. Learn how to develop spiritual disciplines, overcome doubt, and grow deeper in your relationship with God.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
      price: "$24.99",
      pages: 280,
      rating: 4.8,
      category: "Spiritual Growth",
      buyLink: "https://amazon.com",
      featured: true
    },
    {
      id: 2,
      title: "The Power of Word",
      subtitle: "Unlocking Biblical Truths",
      author: "Nehemiah David",
      description: "Discover the transformative power of God's Word and how to apply Scripture effectively in your daily life. This book provides practical insights from years of ministry experience.",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
      price: "$19.99",
      pages: 220,
      rating: 4.9,
      category: "Bible Study",
      buyLink: "https://amazon.com",
      featured: true
    },
    {
      id: 3,
      title: "Corporate Prayer",
      subtitle: "Praying Together for Revival",
      author: "Prathibha David",
      description: "Learn the principles of corporate and Spirit-led prayer that bring revival and transformation. Based on years of leading prayer ministry at Faith Center.",
      image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&q=80",
      price: "$16.99",
      pages: 180,
      rating: 4.7,
      category: "Prayer",
      buyLink: "https://amazon.com",
      featured: false
    },
    {
      id: 4,
      title: "Leading with Vision",
      subtitle: "Ministry Leadership Principles",
      author: "Nehemiah David",
      description: "Principles of servant leadership and vision casting for church and ministry leaders. Learn how to build and lead effective ministry teams.",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80",
      price: "$22.99",
      pages: 240,
      rating: 4.6,
      category: "Leadership",
      buyLink: "https://amazon.com",
      featured: false
    },
    {
      id: 5,
      title: "Faith in Action",
      subtitle: "Practical Christianity for Daily Living",
      author: "Nehemiah David",
      description: "Apply the principles of the Bible to practical situations and challenges of daily living. This book bridges the gap between Sunday teaching and Monday reality.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
      price: "$18.99",
      pages: 200,
      rating: 4.8,
      category: "Christian Living",
      buyLink: "https://amazon.com",
      featured: true
    },
    {
      id: 6,
      title: "Grace & Truth",
      subtitle: "Balancing Love and Holiness",
      author: "Nehemiah David",
      description: "Navigate the balance between grace and truth in your Christian walk. Understanding God's unconditional love while pursuing holiness and righteousness.",
      image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&q=80",
      price: "$21.99",
      pages: 260,
      rating: 4.9,
      category: "Theology",
      buyLink: "https://amazon.com",
      featured: false
    }
  ];

  return (
    <>
      <SEO 
        title="Books - Nehemiah David Ministries"
        description="Explore inspiring books and resources by Nehemiah David and ministry leaders"
      />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-gray-800 to-blue-900 text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <BookOpen className="w-20 h-20 mx-auto mb-8 text-blue-300 animate-pulse" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Books & Resources
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              Explore transformative books and teaching materials by Nehemiah David and ministry leaders. 
              Each resource is designed to help you grow in faith and apply biblical principles to daily living.
            </p>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Featured Books Section */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">Featured Books</h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Popular titles that have transformed lives and strengthened faith in thousands of believers
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.filter(book => book.featured).map((book) => (
                  <div 
                    key={book.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col group"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img 
                        src={book.image} 
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {book.category}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{book.title}</h3>
                      <p className="text-sm text-blue-700 font-medium mb-3">{book.subtitle}</p>
                      <p className="text-sm text-gray-600 mb-4">by {book.author}</p>
                      <p className="text-gray-700 mb-4 flex-1 leading-relaxed">{book.description}</p>
                      
                      {/* Book Details */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{book.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{book.pages} pages</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-3xl font-bold text-blue-900">{book.price}</span>
                        <button
                          onClick={() => window.open(book.buyLink, '_blank')}
                          className="px-5 py-2.5 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg hover:from-blue-800 hover:to-gray-900 transition-all flex items-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl"
                        >
                          <ShoppingCart size={16} />
                          Purchase
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Books Section */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">More Resources</h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Additional books and study materials for your spiritual growth journey
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.filter(book => !book.featured).map((book) => (
                  <div 
                    key={book.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={book.image} 
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {book.category}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h3>
                      <p className="text-xs text-blue-700 font-medium mb-2">{book.subtitle}</p>
                      <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
                      <p className="text-gray-700 mb-4 flex-1 text-sm leading-relaxed line-clamp-3">{book.description}</p>
                      
                      {/* Book Details */}
                      <div className="flex items-center gap-3 mb-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{book.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{book.pages} pages</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-2xl font-bold text-blue-900">{book.price}</span>
                        <button
                          onClick={() => window.open(book.buyLink, '_blank')}
                          className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors flex items-center gap-2 text-sm font-semibold"
                        >
                          <ShoppingCart size={14} />
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Free Resources & Coming Soon Section */}
            <div className="mt-20 grid md:grid-cols-2 gap-8">
              {/* Free Downloads */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-8 border border-blue-200">
                <Download className="w-12 h-12 text-blue-700 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Free Study Guides</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Download complementary study guides and teaching materials to accompany our books and enhance your learning experience.
                </p>
                <button
                  onClick={() => window.open('/contact', '_self')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold shadow-md"
                >
                  <Download size={18} />
                  Access Free Resources
                </button>
              </div>

              {/* Coming Soon */}
              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                <BookOpen className="w-12 h-12 text-gray-700 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">More Coming Soon</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We're working on new books, teaching series, and digital resources. Have a topic you'd like us to cover?
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold shadow-md"
                >
                  Request a Topic
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>

            {/* Testimonial Section */}
            <div className="mt-16 bg-gradient-to-r from-blue-900 to-gray-900 rounded-xl shadow-xl p-12 text-white text-center">
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={24} className="text-yellow-400 fill-yellow-400 mx-1" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl italic mb-6 leading-relaxed">
                  "These books have transformed my understanding of faith and helped me apply biblical principles in practical ways. The teachings are deep yet accessible, perfect for both new believers and mature Christians."
                </p>
                <p className="font-semibold text-blue-200">— Sarah M., Faith Center Member</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
