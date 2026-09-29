import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import api from '../../services/api';
import { Sparkles, Heart, Search, Play, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Designs() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [designs, setDesigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [designsRes, catRes] = await Promise.all([
          api.get('/designs'),
          api.get('/categories')
        ]);
        setDesigns(designsRes.data?.data || []);
        setCategories(catRes.data?.data || []);
      } catch (err) {
        console.error('Failed to load designs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const isWishlisted = (id) => {
    return wishlistItems.some((item) => (item._id || item) === id);
  };

  const handleToggleWishlist = (design) => {
    dispatch(toggleWishlist(design));
  };

  const filteredDesigns = designs.filter((d) => {
    const matchesCat = activeCategory === 'All' || d.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase()) ||
      d.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-amber-400">
          The Haute Couture Lookbook
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white">
          Designer Fashion Collections
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
          Discover our handcrafted boutique designs. Love a specific pattern, neckline, or embroidery? Save it to your Wishlist or book custom tailoring directly with one click.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white dark:bg-stone-900 p-4 sm:p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        
        <div className="relative max-w-md mx-auto sm:mx-0">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by neckline, velvet, kali flare, silk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border-none text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === 'All'
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            All Collections
          </button>
          {categories.map((c) => (
            <button
              key={c._id}
              onClick={() => setActiveCategory(c.name)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === c.name
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

      </div>

      {/* Designs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDesigns.map((design) => {
          const wishlisted = isWishlisted(design._id);
          return (
            <div
              key={design._id}
              className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-80 overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={design.images?.[0]}
                    alt={design.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-stone-950/70 backdrop-blur-md text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-amber-400/30">
                    {design.category}
                  </div>
                  <button
                    onClick={() => handleToggleWishlist(design)}
                    className={`absolute top-3 right-3 p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                      wishlisted
                        ? 'bg-rose-600 text-white scale-110'
                        : 'bg-stone-950/60 text-white hover:bg-rose-600'
                    }`}
                    title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-amber-400 transition-colors">
                    {design.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {design.description}
                  </p>

                  {design.fabricRecommendation && (
                    <div className="pt-2 text-[11px] text-stone-500 dark:text-stone-400">
                      <span className="font-semibold text-stone-700 dark:text-stone-300">Recommended Fabric: </span>
                      {design.fabricRecommendation}
                    </div>
                  )}

                  {design.tags && design.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {design.tags.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-[10px] font-medium text-stone-500 dark:text-stone-400">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400">Est. Stitching Cost</span>
                    <p className="text-lg font-bold text-stone-900 dark:text-white">
                      ₹{design.estimatedPrice}
                    </p>
                  </div>
                  <Link
                    to={`/custom-stitching?design=${encodeURIComponent(design.title)}&clothingType=${encodeURIComponent(design.category)}`}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
                  >
                    Book This Outfit
                  </Link>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
