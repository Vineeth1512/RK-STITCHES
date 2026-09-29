import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Sparkles,
  Scissors
} from 'lucide-react';

export default function Contact() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'General Inquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      dispatch(addToast({ message: 'Please complete all required fields', type: 'warning' }));
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/messages', form);
      dispatch(addToast({
        message: 'Your inquiry has been received! Our master tailor will get in touch shortly.',
        type: 'success'
      }));
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: 'General Inquiry',
        message: ''
      });
    } catch (err) {
      dispatch(addToast({
        message: err.response?.data?.message || 'Failed to send message',
        type: 'error'
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-amber-400">
          Visit or Inquire
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white">
          Contact Our Tailoring Studio
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
          Have an urgent wedding date, custom embroidery questions, or bulk uniform inquiries? Reach out directly or drop by our Banjara Hills atelier.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Business Info & Hours */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                Studio Information
              </h2>
              <div className="space-y-4 text-sm text-stone-700 dark:text-stone-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-brand-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-white">Atelier Address</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      Plot 42, Road No 10, Near City Center Mall, Banjara Hills, Hyderabad, Telangana 500034
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-brand-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-white">Telephone / Calling</p>
                    <a href="tel:+919876543210" className="text-xs text-brand-600 dark:text-amber-400 font-medium">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-brand-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-white">Email Address</p>
                    <a href="mailto:contact@rkstitches.com" className="text-xs text-brand-600 dark:text-amber-400 font-medium">
                      contact@rkstitches.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-brand-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-white">Boutique Timings</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Mon – Sat: 10:00 AM – 9:00 PM<br />
                      Sunday: 10:30 AM – 8:30 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA Card */}
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
              <a
                href="https://wa.me/919876543210?text=Hello%20RK%20Stitches%2C%20I%20have%20an%20inquiry%20regarding%20custom%20stitching."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Embedded Google Map */}
          <div className="rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm h-64 bg-stone-200">
            <iframe
              title="RK Stitches Studio Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.940428456108!2d78.43886561530948!3d17.414605988062837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb973e449a5b47%3A0x6d859fa2ea29b8c6!2sRoad%20No.%2010%2C%20Banjara%20Hills%2C%20Hyderabad%2C%20Telangana%20500034!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 p-8 sm:p-10 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Send an Inquiry Message
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              Ask about measurements, fabric compatibility, bridal slot availability, or price estimates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Swathi Varma"
                  className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765..."
                  className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
                  Inquiry Topic
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                >
                  <option value="General Inquiry">General Tailoring Inquiry</option>
                  <option value="Design Customization">Design Customization / Sketch</option>
                  <option value="Maggam Work Query">Maggam Work & Zardosi Query</option>
                  <option value="Bulk / Uniforms">Bulk / Institutional Uniforms</option>
                  <option value="Measurement Help">Measurement Assistance</option>
                  <option value="Urgent Stitching">Urgent / Express Delivery</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
                Subject *
              </label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="e.g. Bridal blouse turnaround time for November wedding"
                className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
                Your Message *
              </label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Please describe your outfit idea, fabric details, target delivery date, or any specific questions..."
                className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-semibold text-sm flex items-center space-x-2 shadow-lg disabled:opacity-50 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Sending...' : 'Send Message to Studio'}</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
