import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import {
  Scissors,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${slug}`);
        setService(res.data?.data);
      } catch (err) {
        console.error('Failed to load service detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone-500">Loading service details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold">Service Not Found</h2>
        <p className="text-stone-500">We couldn't find the tailoring service you are looking for.</p>
        <Link to="/services" className="inline-block py-2.5 px-6 rounded-xl bg-brand-600 text-white font-semibold">
          Back to All Services
        </Link>
      </div>
    );
  }

  const whatsappMessage = `Hello RK Stitches! I am interested in booking your ${service.name} service. Could you please share more details?`;
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-stone-500">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/services" className="hover:text-brand-600">Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-stone-900 dark:text-stone-100 font-semibold">{service.name}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Images */}
        <div className="lg:col-span-6 space-y-4">
          <div className="h-96 sm:h-[460px] rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 shadow-md">
            <img
              src={service.images?.[activeImage] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80'}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>

          {service.images && service.images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {service.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImage === idx
                      ? 'border-brand-600 shadow-md scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Booking Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-amber-400 text-xs font-semibold">
              {service.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white mt-2">
              {service.name}
            </h1>
            <p className="text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              {service.shortDescription}
            </p>
          </div>

          {/* Pricing & Duration Card */}
          <div className="p-6 rounded-2xl bg-stone-100 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-stone-500 uppercase tracking-wider">Starting Price</span>
              <p className="text-2xl font-bold text-brand-700 dark:text-amber-400">
                ₹{service.startingPrice}
              </p>
              {service.priceRange && (
                <p className="text-xs text-stone-400 mt-0.5">Range: {service.priceRange}</p>
              )}
            </div>
            <div>
              <span className="text-xs text-stone-500 uppercase tracking-wider">Estimated Turnaround</span>
              <div className="flex items-center space-x-1.5 mt-1">
                <Clock className="w-4 h-4 text-amber-500" />
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{service.estimatedDays}</p>
              </div>
              <p className="text-[10px] text-stone-400 mt-0.5">Express delivery available</p>
            </div>
          </div>

          {/* Full In-Depth Description */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              About This Tailoring Service
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Features and Inclusions */}
          {service.features && service.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                What's Included:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-700 dark:text-stone-300">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row gap-4">
            <Link
              to={`/custom-stitching?service=${encodeURIComponent(service.name)}`}
              className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-semibold text-center shadow-xl shadow-brand-500/20 active:scale-95 transition-all"
            >
              Book Custom Stitching
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center space-x-2 shadow-md transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
