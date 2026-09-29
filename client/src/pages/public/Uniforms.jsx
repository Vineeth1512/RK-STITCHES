import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, CheckCircle2, ShieldCheck, Clock, Users, ArrowRight } from 'lucide-react';

export default function Uniforms() {
  const uniformTypes = [
    {
      title: 'School Uniform Sets',
      desc: 'Box-pleated pinafores, formal shirts, shorts, trousers, and skirts with reinforced stress seams.',
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80'
    },
    {
      title: 'College Salwar Uniforms',
      desc: 'Standardized comfortable salwar kameez with neat piping and customized dupatta pico.',
      image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80'
    },
    {
      title: 'Hospital & Lab Coats',
      desc: 'Crisp white doctor coats, nurse tunics, and lab aprons made from durable stain-resistant fabrics.',
      image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&auto=format&fit=crop&q=80'
    },
    {
      title: 'Corporate & Hospitality Attire',
      desc: 'Smart formal vests, blazers, and custom staff uniforms tailored for professional poise.',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-amber-400">
          Institutional Tailoring
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white">
          Uniform Stitching & Bulk Orders
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
          From single school pinafores to bulk college batches of 500+ uniforms, we deliver durable, neatly pressed attire with on-schedule precision.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {uniformTypes.map((u, i) => (
          <div
            key={i}
            className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="h-48 overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img src={u.image} alt={u.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">{u.title}</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{u.desc}</p>
              </div>
            </div>
            <div className="p-5 pt-0">
              <Link
                to={`/custom-stitching?clothingType=School%20%2F%20College%20Uniform`}
                className="w-full block py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold text-center transition-colors"
              >
                Book Uniform Stitching
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Order Inquiries */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-stone-900 to-stone-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">Need Bulk Uniform Stitching for Your School or College?</h2>
          <p className="text-stone-300 text-xs sm:text-sm">
            We provide on-site measurement camps, custom logo machine embroidery, and staggered batch deliveries. Special volume discounts available.
          </p>
        </div>
        <Link
          to="/contact"
          className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm whitespace-nowrap shadow-lg transition-all"
        >
          Request Bulk Quote
        </Link>
      </div>

    </div>
  );
}
