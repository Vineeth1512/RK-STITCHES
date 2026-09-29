import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openVideoModal } from '../../store/slices/uiSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import api from '../../services/api';
import BeforeAfterSlider from '../../components/ui/BeforeAfterSlider';
import {
  Scissors,
  Sparkles,
  Calendar,
  ShieldCheck,
  Clock,
  Heart,
  Play,
  Star,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Award,
  Layers
} from 'lucide-react';

export default function Home() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [services, setServices] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, designsRes, reviewsRes] = await Promise.all([
          api.get('/services?limit=8'),
          api.get('/designs?featured=true&limit=6'),
          api.get('/reviews')
        ]);
        setServices(servicesRes.data?.data || []);
        setDesigns(designsRes.data?.data || []);
        setTestimonials(reviewsRes.data?.data?.featuredTestimonials || []);
      } catch (err) {
        console.error('Home data load error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const isItemWishlisted = (id) => {
    return wishlistItems.some(item => (item._id || item) === id);
  };

  const handleWishlistToggle = (design) => {
    dispatch(toggleWishlist(design));
  };

  return (
    <div className="space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1800&auto=format&fit=crop&q=80"
            alt="Haute Couture Maggam & Silk Embroidery"
            className="w-full h-full object-cover opacity-35 scale-105 transform motion-safe:animate-pulse-subtle"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/40 to-stone-950/80" />
        </div>

        {/* Animated Golden Stitch Accents */}
        <div className="absolute top-1/4 left-10 w-24 h-24 border-2 border-dashed border-amber-400/20 rounded-full animate-spin [animation-duration:30s] pointer-events-none hidden md:block" />
        <div className="absolute bottom-1/4 right-12 w-36 h-36 border-2 border-dashed border-brand-500/20 rounded-full animate-spin [animation-duration:45s] pointer-events-none hidden md:block" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          
          {/* Studio Tag */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium tracking-wider uppercase mb-8 backdrop-blur-md animate-fade-in">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Master Tailoring & Haute Couture Embroidery</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.15] mb-6">
            Flawless Fits.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-brand-400">
              Timeless Indian Elegance.
            </span>
          </h1>

          {/* Subtext */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-stone-300 font-light leading-relaxed mb-10">
            From regal bridal lehengas and intricate hand-embroidered maggam blouses to bespoke long frocks and daily wear, RK Stitches crafts your dream attire with anatomical precision.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              to="/custom-stitching"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-semibold text-base shadow-xl shadow-brand-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center space-x-3 group"
            >
              <Scissors className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              <span>Book Custom Stitching</span>
            </Link>

            <Link
              to="/designs"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-md border border-white/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore Designs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/10 text-stone-300 text-xs sm:text-sm">
            <div className="flex items-center justify-center space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Master Tailor Fit</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>48hr Express Option</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>100% Handcrafted Maggam</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Complimentary Alterations</span>
            </div>
          </div>

        </div>
      </section>


      {/* 2. SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-brand-600 dark:text-amber-400 text-xs font-bold tracking-widest uppercase mb-2">
              <Scissors className="w-4 h-4" />
              <span>Our Tailoring Services</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
              Handcrafted for Every Occasion
            </h2>
          </div>
          <Link
            to="/services"
            className="mt-4 md:mt-0 inline-flex items-center text-sm font-semibold text-brand-600 dark:text-amber-400 hover:underline"
          >
            <span>View All Services</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="group bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 hover:border-brand-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative h-52 overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={service.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80'}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-stone-950/70 backdrop-blur-md text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-amber-400/30">
                  {service.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-amber-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400">Starting from</span>
                    <p className="text-base font-bold text-brand-700 dark:text-amber-400">
                      ₹{service.startingPrice}
                    </p>
                  </div>
                  <Link
                    to={`/services/${service.slug}`}
                    className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-brand-600 hover:text-white dark:hover:bg-amber-500 dark:hover:text-stone-950 text-stone-700 dark:text-stone-200 transition-colors"
                    title="View Details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 3. BEFORE / AFTER TRANSFORMATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-brand-600 dark:text-amber-400 text-xs font-bold tracking-widest uppercase mb-2">
            <Sparkles className="w-4 h-4" />
            <span>The Tailor's Touch</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
            Fabric to Masterpiece
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-2">
            Witness how raw silk, antique metallic zardozi threads, and expert pattern cutting transform into heirloom outfits.
          </p>
        </div>

        <BeforeAfterSlider />
      </section>


      {/* 4. FEATURED COLLECTIONS / DESIGNS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-brand-600 dark:text-amber-400 text-xs font-bold tracking-widest uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Curated Inspiration</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
              Trending Atelier Designs
            </h2>
          </div>
          <Link
            to="/designs"
            className="mt-4 md:mt-0 inline-flex items-center text-sm font-semibold text-brand-600 dark:text-amber-400 hover:underline"
          >
            <span>Explore All Designs</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {designs.map((design) => {
            const wishlisted = isItemWishlisted(design._id);
            return (
              <div
                key={design._id}
                className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-72 overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={design.images?.[0]}
                    alt={design.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-stone-950/70 backdrop-blur-md text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-amber-400/30">
                    {design.category}
                  </div>
                  <button
                    onClick={() => handleWishlistToggle(design)}
                    className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
                      wishlisted
                        ? 'bg-rose-600 text-white'
                        : 'bg-stone-950/60 text-white hover:bg-rose-600'
                    }`}
                    title={wishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-amber-400 transition-colors">
                      {design.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-2 leading-relaxed">
                      {design.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400">Est. Stitching Cost</span>
                      <p className="text-lg font-bold text-stone-900 dark:text-white">
                        ₹{design.estimatedPrice}
                      </p>
                    </div>
                    <Link
                      to={`/custom-stitching?design=${encodeURIComponent(design.title)}`}
                      className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-md transition-colors"
                    >
                      Book This Design
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 5. PROCESS / HOW IT WORKS */}
      <section className="bg-stone-100 dark:bg-stone-900/60 py-20 border-y border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-amber-400">
              Effortless Bespoke Tailoring
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white mt-2">
              How Custom Stitching Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm relative z-10">
              <span className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-sm flex items-center justify-center mb-4">1</span>
              <h3 className="font-serif text-lg font-bold mb-2">Select Style or Upload</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Pick from our curated boutique collections or upload reference photos and sketches from Pinterest/Instagram.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm relative z-10">
              <span className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-sm flex items-center justify-center mb-4">2</span>
              <h3 className="font-serif text-lg font-bold mb-2">Submit Measurements</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Use our guided measurement profile, send a sample garment, or request doorstep measurement collection.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm relative z-10">
              <span className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-sm flex items-center justify-center mb-4">3</span>
              <h3 className="font-serif text-lg font-bold mb-2">Master Crafting</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Our master cutters and maggam karigars hand-stitch your piece with double lining and safety margins.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm relative z-10">
              <span className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-sm flex items-center justify-center mb-4">4</span>
              <h3 className="font-serif text-lg font-bold mb-2">Trial & Handover</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Track status online until completion. Try in-boutique or receive doorstep delivery with free alterations.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 6. CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-amber-400">
            Real Stories, Real Smiles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white mt-2">
            Loved by Hyderabad’s Discerning Women
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-1 text-amber-400 mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-300 italic leading-relaxed">
                  "{t.reviewText}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 dark:border-stone-800 flex items-center space-x-3">
                <img
                  src={t.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                  alt={t.clientName}
                  className="w-11 h-11 rounded-full object-cover border border-amber-400/40"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white">{t.clientName}</h4>
                  <p className="text-xs text-stone-400">{t.occasion || t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 7. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-900 via-brand-800 to-amber-900 text-white p-8 sm:p-14 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-4 inline-block">
              Express Booking
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight mb-4">
              Have a Wedding or Special Event Approaching?
            </h2>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed mb-8">
              Book your custom stitching slot today. Our master tailor will review your fabrics, assist with design sketching, and guarantee on-time delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/custom-stitching"
                className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-lg transition-all"
              >
                Start Your Stitching Order
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hello%20RK%20Stitches%2C%20I%20have%20an%20urgent%20event%20and%20need%20custom%20stitching%20assistance"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
