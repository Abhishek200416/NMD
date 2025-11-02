import { useState, useEffect } from "react";
import { useBrand, API } from "@/App";
import axios from "axios";
import { X } from "lucide-react";

const Gallery = () => {
  const { currentBrand } = useBrand();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (currentBrand) {
      loadGallery();
    }
  }, [currentBrand]);

  const loadGallery = async () => {
    try {
      const response = await axios.get(`${API}/gallery?brand_id=${currentBrand.id}`);
      setImages(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
      console.error("Error loading gallery:", error);
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-testid="gallery-page-title">
            Photo Gallery
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Moments captured from our community events and gatherings
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section bg-white">
        <div className="container">
          {loading ? (
            <div className="text-center py-12">Loading gallery...</div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No images in gallery yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="aspect-square cursor-pointer overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(image)}
                  data-testid={`gallery-image-${image.id}`}
                >
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedImage(null)}>
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full"
            data-testid="close-lightbox-btn"
          >
            <X size={24} />
          </button>
          <div className="max-w-6xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="bg-white rounded-b-lg p-4 mt-2">
              <h3 className="font-semibold text-lg">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-gray-600 text-sm mt-1">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
