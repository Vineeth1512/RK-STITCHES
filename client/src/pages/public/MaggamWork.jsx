import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Scissors, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';

export default function MaggamWork() {
  const motifs = [
    { title: 'Royal Peacock Motif', desc: 'Embroidered with antique metallic zari, micro-pearl drops, and ruby red kundan stones.' },
    { title: 'Lotus Pond (Padma) Neckline', desc: 'Sacred blooming lotus petals rendered in pink raw silk threads and fine cut-dana.' },
    { title: 'Temple Arch & Pillar Borders', desc: 'Inspired by South Indian temple architecture with dense gold zardozi bullion wires.' },
    { title: 'Bridal Doli & Barat Procession', desc: 'Intricate storytelling embroidery along the elbow sleeves celebrating bridal joy.' }
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Banner */}
      <section className="relative py-24 bg-stone-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1800&auto=format&fit=crop&q=80"
            alt="Maggam Embroidery"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold uppercase tracking-widest inline-block">
            Traditional Hand Embroidery
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold">
            Haute Couture Maggam & Aari Work
          </h1>
          <p className="text-stone-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Every stitch is placed by generational artisans using genuine non-tarnish zardozi, Austrian kundan crystals, and freshwater pearls.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/custom-stitching?service=Handcrafted%20Maggam%20Work&clothingType=Maggam%20Work%20Blouse"
              className="py-3.5 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-xl transition-all"
            >
              Order Maggam Work Blouse
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hello%20RK%20Stitches%2C%20I%20would%20like%20to%20discuss%20a%20maggam%20work%20design"
              target="_blank"
              rel="noreferrer"
              className="py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
            >
              Consult on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Motifs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-amber-400">
            Iconic Patterns
          </span>
          <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white mt-1">
            Signature Maggam Work Motifs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {motifs.map((motif, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
              <Sparkles className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">{motif.title}</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{motif.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Our Maggam Work Stands Out */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100 dark:bg-stone-900/60 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
              Why Brides Choose RK Stitches
            </h2>
            <ul className="space-y-3 text-sm text-stone-700 dark:text-stone-300">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Custom traced to your exact neckline to avoid cut-throughs during tailoring</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>High-density metallic thread embedding that never snags on silk saree pleats</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Precision matching of border tones to your authentic Kanjeevaram / Paithani zari</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Finished with premium padded cotton lining and handmade pearl latkans</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
              alt="Maggam Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
