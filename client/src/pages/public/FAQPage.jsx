import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Search, ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const categories = [
    'All',
    'Stitching',
    'Measurements',
    'Delivery',
    'Payments',
    'Maggam Work',
    'Custom Designs',
    'Alterations'
  ];

  useEffect(() => {
    api.get('/faqs')
      .then((res) => setFaqs(res.data?.data || []))
      .catch((err) => console.error(err));
  }, []);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-amber-400">
          Got Questions?
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
          Everything you need to know about our stitching timelines, measurement options, maggam embroidery, and free alterations.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search questions (e.g. alterations, turnaround, lining)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-sm focus:ring-2 focus:ring-brand-500 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq._id;
            return (
              <div
                key={faq._id}
                className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleAccordion(faq._id)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 hover:bg-stone-50/50 dark:hover:bg-stone-800/50 transition-colors"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500 transform transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-brand-600 dark:text-amber-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800/80 animate-fade-in">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-3 text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Category: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-stone-400">
            <HelpCircle className="w-8 h-8 mx-auto mb-2 text-stone-300" />
            <p>No questions matched your search criteria.</p>
          </div>
        )}
      </div>

    </div>
  );
}
