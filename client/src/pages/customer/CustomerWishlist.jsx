import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlist, toggleWishlist } from '../../store/slices/wishlistSlice';
import { Heart, Trash2, Scissors, ArrowRight } from 'lucide-react';

export default function CustomerWishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const loading = useSelector((state) => state.wishlist.loading);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (item) => {
    dispatch(toggleWishlist(item));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
          My Saved Designs & Wishlist
        </h1>
        <p className="text-xs text-stone-500">
          Your saved inspirational styles ready for custom made-to-measure tailoring
        </p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemove(item)}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-stone-950/70 hover:bg-rose-600 text-white backdrop-blur-md transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <span className="absolute top-3 left-3 bg-stone-950/70 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs text-stone-500 line-clamp-2">{item.description}</p>
                  {item.estimatedPrice > 0 && (
                    <p className="text-sm font-bold text-brand-700 dark:text-amber-400 pt-1">
                      Est: ₹{item.estimatedPrice}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={`/custom-stitching?design=${encodeURIComponent(item.title)}&clothingType=${encodeURIComponent(item.category)}`}
                  className="w-full block py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold text-center shadow-md transition-colors"
                >
                  Stitch This Saved Design →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4">
          <Heart className="w-12 h-12 mx-auto text-stone-300" />
          <h3 className="font-serif text-xl font-bold">Your Wishlist is Empty</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Browse our Lookbook or Collections and tap the heart icon to save outfits for your upcoming events.
          </p>
          <Link
            to="/designs"
            className="inline-block py-2.5 px-6 rounded-xl bg-brand-600 text-white font-semibold text-xs"
          >
            Explore Fashion Designs
          </Link>
        </div>
      )}

    </div>
  );
}
