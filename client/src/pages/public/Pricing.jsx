import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, CheckCircle2, Sparkles, Clock, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Pricing() {
  const priceCategories = [
    {
      title: 'Blouse Stitching',
      startingPrice: '₹650',
      popular: true,
      description: 'Zero-wrinkle master drafted blouse cuts with premium lining.',
      items: [
        { name: 'Plain Cotton / Silk Blouse', price: '₹650' },
        { name: 'Princess Cut Blouse', price: '₹850' },
        { name: 'Padded Designer Cut Blouse', price: '₹1,100' },
        { name: 'High Neck / Boat Neck / Collar Cut', price: '₹950' },
        { name: 'Backless Dori Cut with Tassels', price: '₹1,250' },
        { name: 'Corset / Illusion Net Cut', price: '₹1,600' }
      ]
    },
    {
      title: 'Maggam & Aari Work',
      startingPrice: '₹2,200',
      popular: true,
      description: '100% handcrafted metallic zardozi, beads, kundan and threadwork.',
      items: [
        { name: 'Simple Border & Back Neck Motif', price: '₹2,200 - ₹3,500' },
        { name: 'Medium Jaal & Sleeve Work', price: '₹3,800 - ₹6,500' },
        { name: 'Heavy Bridal Peacock / Temple Motif', price: '₹7,500 - ₹14,000' },
        { name: 'Full Grand Bridal Zardozi Work', price: '₹15,000 - ₹28,000' },
        { name: 'Lehenga Waistband & Kali Borders', price: '₹6,000 - ₹18,000' }
      ]
    },
    {
      title: 'Lehengas & Cholis',
      startingPrice: '₹2,500',
      popular: false,
      description: 'Full flare, multi-kali skirts with can-can installation.',
      items: [
        { name: 'Basic Flare Lehenga & Choli', price: '₹2,500' },
        { name: '16 to 24 Kali Umbrella Lehenga', price: '₹3,500' },
        { name: 'Bridal Can-Can & Heavy Buckram Skirt', price: '₹4,500' },
        { name: 'Designer Blouse & Dupatta Finishing', price: 'Included' }
      ]
    },
    {
      title: 'Long Frocks & Saree Conversions',
      startingPrice: '₹1,400',
      popular: false,
      description: 'Flared floor length dresses and upcycled heirloom sarees.',
      items: [
        { name: 'Umbrella Cut Long Frock', price: '₹1,400' },
        { name: 'Saree-to-Frock Conversion (with lining)', price: '₹1,850' },
        { name: 'Organza / Net Layered Gown', price: '₹2,600' },
        { name: 'Kids Ethnic Long Frock (up to 12 yrs)', price: '₹1,100' }
      ]
    },
    {
      title: 'Kurtis, Salwars & Pants',
      startingPrice: '₹500',
      popular: false,
      description: 'Everyday elegance and festive coordinated sets.',
      items: [
        { name: 'Straight Cut Kurti (without lining)', price: '₹500' },
        { name: 'Lined Kurti with Side Pocket', price: '₹750' },
        { name: 'Anarkali / Alia Cut Kurti', price: '₹950' },
        { name: 'Cigarette Pant / Palazzo / Salwar', price: '₹450' }
      ]
    },
    {
      title: 'Uniforms & Bulk Stitching',
      startingPrice: '₹450',
      popular: false,
      description: 'Reinforced durable stitching for institutions.',
      items: [
        { name: 'School Pinafore Set', price: '₹550' },
        { name: 'Shirt & Pleated Skirt / Trousers', price: '₹650' },
        { name: 'College Salwar Suit Uniform', price: '₹600' },
        { name: 'Hospital / Lab Coat', price: '₹450' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-amber-400">
          Transparent & Honest Rates
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white">
          Clear Tailoring Pricing
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
          No hidden fees or surprise markups. Every quote includes premium inner lining, safety margin folds, and complimentary fittings.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {priceCategories.map((cat, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
              cat.popular
                ? 'bg-white dark:bg-stone-900 border-2 border-brand-500 shadow-xl relative'
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm'
            }`}
          >
            <div>
              {cat.popular && (
                <span className="absolute -top-3 right-6 bg-gradient-to-r from-brand-600 to-amber-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                  Most Requested
                </span>
              )}

              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                {cat.title}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {cat.description}
              </p>

              <div className="my-6 pb-6 border-b border-stone-100 dark:border-stone-800">
                <span className="text-xs text-stone-400">Starting from</span>
                <p className="font-serif text-3xl font-bold text-brand-600 dark:text-amber-400">
                  {cat.startingPrice}
                </p>
              </div>

              {/* Items List */}
              <ul className="space-y-3 text-xs sm:text-sm">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-center justify-between py-1">
                    <span className="text-stone-700 dark:text-stone-300">{item.name}</span>
                    <span className="font-semibold text-stone-900 dark:text-white ml-2">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Link
                to={`/custom-stitching?clothingType=${encodeURIComponent(cat.title.split(' ')[0])}`}
                className="w-full block py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold text-center transition-colors shadow-md"
              >
                Book This Service
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Complimentary Inclusions Box */}
      <div className="p-8 rounded-3xl bg-amber-50 dark:bg-stone-900/90 border border-amber-300 dark:border-amber-800 shadow-sm">
        <h3 className="font-serif text-xl font-bold text-amber-900 dark:text-amber-300 mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
          Included in Every Custom Stitching Order At No Extra Cost:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm text-stone-800 dark:text-stone-200">
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Pre-shrunk, soft breathable inner cotton lining</span>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>2-inch internal safety margins for lifelong alterations</span>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Hand-finished thread eyes and reinforced hook fasteners</span>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Complimentary fitting trials & minor adjustments</span>
          </div>
        </div>
      </div>

    </div>
  );
}
