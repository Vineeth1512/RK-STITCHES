import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFloatingBtn({ customMessage = null }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '919876543210';
  const defaultText = customMessage || "Hello RK Stitches! I would like to inquire about custom tailoring & stitching.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultText)}`;

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-6 z-40 flex items-center">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="mr-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-xs px-3 py-2 rounded-xl shadow-xl flex items-center space-x-2 animate-fade-in max-w-[200px]">
          <span>Need stitching help? Chat with our tailor on WhatsApp!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-stone-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full" />
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
