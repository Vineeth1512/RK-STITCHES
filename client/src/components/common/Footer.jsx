import React from 'react';
import { Link } from 'react-router-dom';
import {
  Scissors,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 lg:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-amber-600 flex items-center justify-center text-white shadow-md">
                <Scissors className="w-5 h-5 rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  RK STITCHES
                </span>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-amber-400">
                  Haute Couture & Tailoring Studio
                </span>
              </div>
            </Link>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Hyderabad’s premier destination for custom tailoring, handcrafted bridal maggam work, precision-fitted blouses, festive lehengas, and designer outfits for women and children.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-brand-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-brand-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-brand-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 font-serif">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">About Our Studio</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-400 transition-colors">All Stitching Services</Link>
              </li>
              <li>
                <Link to="/designs" className="hover:text-amber-400 transition-colors">Fashion Collections</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-400 transition-colors">Lookbook Gallery</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-amber-400 transition-colors">Transparent Pricing</Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-amber-400 transition-colors">Behind the Seams Videos</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-amber-400 transition-colors">Client Reviews</Link>
              </li>
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 font-serif">
              Specialties
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/maggam-work" className="hover:text-amber-400 transition-colors flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  Maggam & Aari Work
                </Link>
              </li>
              <li>
                <Link to="/blouse-designs" className="hover:text-amber-400 transition-colors">Blouse Tailoring</Link>
              </li>
              <li>
                <Link to="/lehenga-designs" className="hover:text-amber-400 transition-colors">Bridal Lehengas</Link>
              </li>
              <li>
                <Link to="/frocks" className="hover:text-amber-400 transition-colors">Designer Long Frocks</Link>
              </li>
              <li>
                <Link to="/kurtis" className="hover:text-amber-400 transition-colors">Kurtis & Suits</Link>
              </li>
              <li>
                <Link to="/uniforms" className="hover:text-amber-400 transition-colors">School & Staff Uniforms</Link>
              </li>
              <li>
                <Link to="/custom-stitching" className="hover:text-amber-400 transition-colors text-amber-300 font-medium">Book Custom Stitching</Link>
              </li>
            </ul>
          </div>

          {/* Studio Contact & Hours */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 font-serif">
              Studio & Hours
            </h3>
            <div className="flex items-start space-x-2.5 text-sm">
              <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0 mt-1" />
              <span>Plot 42, Road No 10, Banjara Hills, Hyderabad, TS 500034</span>
            </div>
            <div className="flex items-center space-x-2.5 text-sm">
              <Phone className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a>
            </div>
            <div className="flex items-center space-x-2.5 text-sm">
              <Mail className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <a href="mailto:contact@rkstitches.com" className="hover:text-white">contact@rkstitches.com</a>
            </div>
            <div className="flex items-start space-x-2.5 text-sm pt-1">
              <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <p>Mon - Sat: 10:00 AM - 9:00 PM</p>
                <p>Sunday: 10:30 AM - 8:30 PM</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} RK Stitches. All rights reserved. Master Tailoring & Designer Studio.</p>
          <div className="flex space-x-6">
            <Link to="/faq" className="hover:text-stone-300">FAQ</Link>
            <Link to="/privacy-policy" className="hover:text-stone-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-stone-300">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
