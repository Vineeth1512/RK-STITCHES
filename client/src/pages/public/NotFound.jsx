import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md w-full space-y-6 animate-slide-up">
        {/* Needle & loose thread visual */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-brand-100 dark:bg-brand-950/80 border-2 border-dashed border-brand-500/40 flex items-center justify-center text-brand-600 dark:text-amber-400">
            <Scissors className="w-10 h-10 rotate-45" />
          </div>
          <span className="absolute -top-1 -right-1 text-2xl font-bold font-serif text-brand-700 dark:text-amber-400">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
            Looks like this stitch came loose.
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            The page or pattern you're looking for doesn't exist or has been tailored into a new design.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/"
            className="py-3 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-colors flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/services"
            className="py-3 px-6 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-colors"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}
