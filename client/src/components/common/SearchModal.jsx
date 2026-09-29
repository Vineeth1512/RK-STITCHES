import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeSearch } from '../../store/slices/uiSlice';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Search, X, Scissors, Sparkles, HelpCircle, ChevronRight, Loader2 } from 'lucide-react';

export default function SearchModal() {
  const dispatch = useDispatch();
  const searchOpen = useSelector((state) => state.ui.searchOpen);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ services: [], designs: [], faqs: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ services: [], designs: [], faqs: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const [servicesRes, designsRes, faqsRes] = await Promise.all([
          api.get(`/services?search=${encodeURIComponent(query)}`),
          api.get(`/designs?search=${encodeURIComponent(query)}`),
          api.get(`/faqs?search=${encodeURIComponent(query)}`)
        ]);

        setResults({
          services: servicesRes.data?.data || [],
          designs: designsRes.data?.data || [],
          faqs: faqsRes.data?.data || []
        });
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!searchOpen) return null;

  const totalResults = results.services.length + results.designs.length + results.faqs.length;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-fade-in">
      <div className="bg-white dark:bg-stone-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 dark:border-stone-800">
          <Search className="w-5 h-5 text-stone-400 mr-3" />
          <input
            type="text"
            placeholder="Search custom stitching, maggam blouses, lehengas, FAQs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none text-base"
          />
          {loading && <Loader2 className="w-5 h-5 text-brand-600 animate-spin mr-2" />}
          <button
            onClick={() => dispatch(closeSearch())}
            className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-6">
          {query.trim() && !loading && totalResults === 0 && (
            <div className="text-center py-8 text-stone-400">
              <p className="text-sm">No results found for "{query}".</p>
              <p className="text-xs text-stone-500 mt-1">Try searching for "blouse", "maggam", "lehenga", or "uniforms".</p>
            </div>
          )}

          {!query.trim() && (
            <div className="text-xs text-stone-400 space-y-2 py-4">
              <p className="font-semibold uppercase tracking-wider text-stone-500">Popular Searches:</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Bridal Maggam Blouse', '16 Kali Lehenga', 'Princess Cut Blouse', 'Long Frock Saree Conversion', 'School Uniforms'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Services Results */}
          {results.services.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-amber-400 mb-2 flex items-center">
                <Scissors className="w-3.5 h-3.5 mr-1.5" />
                Stitching Services ({results.services.length})
              </h4>
              <div className="space-y-1">
                {results.services.map((item) => (
                  <Link
                    key={item._id}
                    to={`/services/${item.slug}`}
                    onClick={() => dispatch(closeSearch())}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 group-hover:text-brand-600 dark:group-hover:text-amber-400">
                        {item.name}
                      </p>
                      <p className="text-xs text-stone-500 line-clamp-1">{item.shortDescription}</p>
                    </div>
                    <span className="text-xs font-semibold text-brand-600 dark:text-amber-400">
                      From ₹{item.startingPrice}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Designs Results */}
          {results.designs.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-amber-400 mb-2 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Fashion Designs ({results.designs.length})
              </h4>
              <div className="space-y-1">
                {results.designs.map((item) => (
                  <Link
                    key={item._id}
                    to={`/designs`}
                    onClick={() => dispatch(closeSearch())}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 group-hover:text-brand-600 dark:group-hover:text-amber-400">
                          {item.title}
                        </p>
                        <p className="text-xs text-stone-500">{item.category}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Results */}
          {results.faqs.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-amber-400 mb-2 flex items-center">
                <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
                Frequently Asked Questions ({results.faqs.length})
              </h4>
              <div className="space-y-1">
                {results.faqs.map((faq) => (
                  <Link
                    key={faq._id}
                    to={`/faq`}
                    onClick={() => dispatch(closeSearch())}
                    className="block p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                      {faq.question}
                    </p>
                    <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{faq.answer}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
