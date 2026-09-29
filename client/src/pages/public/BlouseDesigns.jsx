import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import api from '../../services/api';
import { Scissors, Sparkles, ArrowRight, Heart } from 'lucide-react';

export default function BlouseDesigns() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const isWishlisted = (id) => wishlistItems.some((item) => (item._id || item) === id);

  useEffect(() => {
    api.get('/designs?category=Blouses')
      .then((res) => {
        setDesigns(res.data?.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-amber-400">
          Precision Tailoring
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white">
          Blouse Designs & Cuts
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
          From classic Katori and Princess Cut blouses to backless dori, illusion net, boat neck, and high-collar cuts. Every blouse is tailored with 2-inch inner margins and pre-shrunk cotton lining.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {designs.map((d) => (
          <div
            key={d._id}
            className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-72 overflow-hidden bg-stone-100 dark:bg-stone-800 group">
                <img src={d.images[0]} alt={d.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button
                  onClick={() => dispatch(toggleWishlist(d))}
                  className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
                    isWishlisted(d._id)
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-stone-950/60 text-white hover:bg-rose-500'
                  }`}
                  title={isWishlisted(d._id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">{d.title}</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">{d.description}</p>
              </div>
            </div>
            <div className="p-6 pt-0 border-t border-stone-100 dark:border-stone-800 mt-4 flex items-center justify-between">
              <span className="font-bold text-brand-700 dark:text-amber-400">₹{d.estimatedPrice}</span>
              <Link
                to={`/custom-stitching?clothingType=Blouse&design=${encodeURIComponent(d.title)}`}
                className="py-2 px-4 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-colors"
              >
                Stitch This Blouse
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
