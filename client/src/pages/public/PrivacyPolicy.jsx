import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-stone-500 mt-2">Effective Date: October 2026</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-sm text-stone-700 dark:text-stone-300 space-y-6 leading-relaxed">
        <p>
          At RK Stitches, your privacy and trust are of paramount importance to us. This Privacy Policy details how we collect, use, and protect your personal information when you use our custom stitching and tailoring platform.
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">1. Information We Collect</h3>
        <p>
          When you register an account, book a custom stitching appointment, or save measurement profiles, we collect your name, phone number, email address, physical delivery address, anatomical body measurements, garment reference photos, and event deadlines.
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">2. How We Use Your Information</h3>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>To cut, tailor, and craft made-to-measure garments matching your specific dimensions.</li>
          <li>To provide real-time WhatsApp and SMS tracking updates regarding your order progress.</li>
          <li>To coordinate boutique fitting appointments or safe doorstep deliveries.</li>
          <li>To securely archive your saved measurement profiles for effortless reordering.</li>
        </ul>

        <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">3. Data Security</h3>
        <p>
          We implement industry-standard encryption protocols and never sell, rent, or lease your private contact information, addresses, or photos to third-party advertising brokers.
        </p>
      </div>
    </div>
  );
}
