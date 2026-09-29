import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Scissors, Search, ArrowRight, Clock, CheckCircle2, Sparkles, Filter } from 'lucide-react';

export default function Services() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesRes, categoriesRes] = await Promise.all([
          api.get('/services'),
          api.get('/categories')
        ]);
        setServices(servicesRes.data?.data || []);
        setCategories(categoriesRes.data?.data || []);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredServices = services
    .filter((s) => {
      const matchesCategory = activeCategory === 'All' || s.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        s.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-high') return b.startingPrice - a.startingPrice;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-amber-400">
          Atelier Specialties
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white">
          Our Tailoring & Stitching Services
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
          From everyday kurtis and uniform precision to imperial bridal maggam lehengas, explore our full spectrum of bespoke women's and children's tailoring services.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-stone-900 p-4 sm:p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        
        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search by service or fabric..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border-none text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-stone-500">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-sm font-medium text-stone-800 dark:text-stone-200 border-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="default">Featured / Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === 'All'
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            All Services
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service._id}
            className="group bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 hover:border-brand-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Media image */}
              <div className="relative h-60 overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={service.images?.[0]}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-stone-950/70 backdrop-blur-md text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-amber-400/30">
                  {service.category}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 space-y-3">
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-amber-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Features list */}
                {service.features && service.features.length > 0 && (
                  <ul className="pt-2 space-y-1 text-xs text-stone-500 dark:text-stone-400">
                    {service.features.slice(0, 2).map((f, i) => (
                      <li key={i} className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="line-clamp-1">{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Bottom pricing & actions */}
            <div className="p-6 pt-0">
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Starting from</span>
                  <p className="text-lg font-bold text-brand-700 dark:text-amber-400">
                    ₹{service.startingPrice}
                  </p>
                  <p className="text-[10px] text-stone-400">{service.estimatedDays}</p>
                </div>

                <div className="flex space-x-2">
                  <Link
                    to={`/services/${service.slug}`}
                    className="px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/custom-stitching?service=${encodeURIComponent(service.name)}`}
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-md transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
