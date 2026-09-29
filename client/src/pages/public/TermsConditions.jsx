import React from 'react';

export default function TermsConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
          Terms & Conditions
        </h1>
        <p className="text-xs text-stone-500 mt-2">Effective Date: October 2026</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-sm text-stone-700 dark:text-stone-300 space-y-6 leading-relaxed">
        <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">1. Custom Stitching & Measurements</h3>
        <p>
          Custom stitching orders are drafted strictly according to the measurements, sample garment, or sizing profile provided by the customer. While we maintain a 99% initial trial accuracy rate, we offer free minor fitting adjustments on all bespoke garments.
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">2. Fabric Delivery & Responsibility</h3>
        <p>
          Customers providing their own fabrics or heirloom sarees are encouraged to inspect yardage for pre-existing manufacturing defects or dye bleeding before handover. RK Stitches takes utmost care with all client materials.
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">3. Turnaround Times & Deadlines</h3>
        <p>
          Target completion dates agreed upon at confirmation will be strictly honored. In case of rare fabric sourcing delays or unforeseen public holidays, our customer coordinator will notify you promptly.
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">4. Alterations Policy</h3>
        <p>
          We provide complimentary fitting alterations within 14 days of outfit handover. All blouses and dresses are tailored with internal 1.5 to 2 inch safety margins for future resizing.
        </p>
      </div>
    </div>
  );
}
