import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openVideoModal } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { Play, Video as VideoIcon, Clock, Sparkles } from 'lucide-react';

export default function Videos() {
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Stitching Process',
    'Before / After',
    'Design Showcase',
    'Maggam Work',
    'Customer Outfits',
    'Behind The Scenes'
  ];

  useEffect(() => {
    api.get('/videos')
      .then((res) => setVideos(res.data?.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredVideos = videos.filter(
    (v) => activeCategory === 'All' || v.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-amber-400">
          Atelier in Motion
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white">
          Behind the Seams & Video Showcase
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
          Watch our master cutters draft anatomical pattern pieces, see intricate maggam needles weave gold metallic threads, and experience the twirl of custom bridal lehengas.
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

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((video) => (
          <div
            key={video._id}
            onClick={() => dispatch(openVideoModal(video))}
            className="group cursor-pointer bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Thumbnail with Play Overlay */}
            <div className="relative h-60 overflow-hidden bg-stone-900">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-stone-950/30 group-hover:bg-stone-950/10 transition-colors" />

              {/* Pulsing Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-brand-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-brand-500 transition-all">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>

              {/* Category & Duration Tags */}
              <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-400/30">
                {video.category}
              </div>
              <div className="absolute bottom-3 right-3 bg-stone-950/80 backdrop-blur-md text-white text-xs font-mono px-2 py-0.5 rounded-lg flex items-center space-x-1">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>{video.duration}</span>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-6 space-y-2">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                {video.title}
              </h3>
              {video.description && (
                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                  {video.description}
                </p>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
