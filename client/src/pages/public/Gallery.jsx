import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Image, X, ZoomIn, ZoomOut, Maximize2, Sparkles, Filter } from 'lucide-react';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Blouse',
    'Maggam Work',
    'Lehenga',
    'Frock',
    'Kurti',
    'Langa',
    'Uniform',
    'Custom Designs'
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get('/gallery');
        setItems(res.data?.data || []);
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = items.filter(
    (item) => activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase()
  );

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setZoomLevel(1);
  };

  const handlePrev = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
      setZoomLevel(1);
    }
  };

  const handleNext = () => {
    if (lightboxIndex < filteredItems.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
      setZoomLevel(1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-amber-400">
          Visual Inspiration
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white">
          Our Lookbook Gallery
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
          Explore our real bespoke creations—from magnificent bridal embroidery to everyday comfort fits. Click on any outfit to inspect detailed craftsmanship.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-Style Image Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredItems.map((item, index) => (
          <div
            key={item._id || index}
            onClick={() => openLightbox(index)}
            className="group relative rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 break-inside-avoid"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              loading="lazy"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Hover overlay with caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                {item.category}
              </span>
              <h3 className="font-serif text-lg font-bold mt-1">{item.title}</h3>
              {item.caption && (
                <p className="text-xs text-stone-300 mt-1 line-clamp-2">{item.caption}</p>
              )}
              <div className="mt-3 flex items-center text-xs text-amber-300 space-x-1">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Click to expand & zoom</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fade-in">
          
          {/* Top toolbar */}
          <div className="flex items-center justify-between text-white z-10">
            <div>
              <span className="text-xs text-amber-400 font-semibold uppercase">
                {filteredItems[lightboxIndex].category} ({lightboxIndex + 1} / {filteredItems.length})
              </span>
              <h3 className="font-serif text-lg font-bold">
                {filteredItems[lightboxIndex].title}
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-lg bg-stone-800 hover:bg-rose-600 text-white transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Centered Image with Zoom Scale */}
          <div className="flex-1 flex items-center justify-center overflow-hidden my-4">
            <img
              src={filteredItems[lightboxIndex].imageUrl}
              alt={filteredItems[lightboxIndex].title}
              style={{ transform: `scale(${zoomLevel})` }}
              className="max-h-[75vh] max-w-full object-contain rounded-xl transition-transform duration-200 select-none shadow-2xl"
            />
          </div>

          {/* Bottom caption & navigation */}
          <div className="flex items-center justify-between text-white text-xs z-10 pt-2 border-t border-stone-800">
            <button
              onClick={handlePrev}
              disabled={lightboxIndex === 0}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:hover:bg-stone-800"
            >
              ← Previous
            </button>
            <p className="text-stone-400 text-center max-w-lg hidden sm:block">
              {filteredItems[lightboxIndex].caption}
            </p>
            <button
              onClick={handleNext}
              disabled={lightboxIndex === filteredItems.length - 1}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:hover:bg-stone-800"
            >
              Next →
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
