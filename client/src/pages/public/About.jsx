import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Sparkles, Heart, Award, CheckCircle, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-20 pb-20">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&auto=format&fit=crop&q=80"
            alt="Tailoring Atelier"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Our Heritage & Craft</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-3 mb-6">
            The Art of Flawless Tailoring
          </h1>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            At RK Stitches, every cut, seam, and zardozi bead honors the rich traditions of Indian fashion while embracing contemporary ergonomic fits.
          </p>
        </div>
      </section>

      {/* Philosophy & Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-brand-600 dark:text-amber-400 text-xs font-bold tracking-widest uppercase">
              <Scissors className="w-4 h-4" />
              <span>Our Story</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white leading-snug">
              Bespoke Tailoring Dedicated to Perfection Since Day One
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              Founded in Hyderabad, RK Stitches was born out of a simple observation: modern women frequently struggle to find tailors who understand intricate bridal embroidery, precision princess-cut necklines, and modern silhouettes—all while delivering strictly on time.
            </p>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              We brought together veteran master pattern cutters, generational maggam karigars, and a digital-first measurement and tracking system to deliver an unprecedented bespoke experience.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-stone-200 dark:border-stone-800">
              <div>
                <p className="font-serif text-3xl font-bold text-brand-600 dark:text-amber-400">12,000+</p>
                <p className="text-xs text-stone-500 mt-1">Bespoke Outfits Delivered</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-brand-600 dark:text-amber-400">100%</p>
                <p className="text-xs text-stone-500 mt-1">Handcrafted Maggam Work</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800">
              <img
                src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&auto=format&fit=crop&q=80"
                alt="Master Artisan Crafting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-stone-100 dark:bg-stone-900/60 py-16 border-y border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
              The RK Stitches Quality Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
              <Award className="w-8 h-8 text-brand-600 dark:text-amber-400" />
              <h3 className="font-serif text-lg font-bold">Zero Wrinkle Fit</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                We custom draft armhole curves, front chest fullness, and neck depths according to your natural posture.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
              <Sparkles className="w-8 h-8 text-brand-600 dark:text-amber-400" />
              <h3 className="font-serif text-lg font-bold">Non-Tarnish Materials</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Only export-grade gold and silver zardozi wires, genuine glass kundan, and pre-shrunk cotton inner lining.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
              <Heart className="w-8 h-8 text-brand-600 dark:text-amber-400" />
              <h3 className="font-serif text-lg font-bold">Lifelong Care & Alterations</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Generous internal safety margins allow effortless adjustments as sizing needs evolve over the years.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
