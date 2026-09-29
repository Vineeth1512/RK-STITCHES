import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { Settings, Save, Phone, Mail, MapPin, Clock, Globe } from 'lucide-react';

export default function AdminSettings() {
  const dispatch = useDispatch();
  const [settings, setSettings] = useState({
    businessName: 'RK STITCHES',
    tagline: 'Exclusive Tailoring & Designer Studio for Women & Kids',
    phone: '+91 98765 43210',
    whatsapp: '+919876543210',
    email: 'contact@rkstitches.com',
    heroHeading: 'Master Tailoring & Haute Couture Embroidery',
    heroSubheading: 'From regal bridal lehengas and intricate maggam work blouses to contemporary everyday silhouettes.',
    address: {
      street: 'Plot 42, Road No 10, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034'
    },
    businessHours: {
      weekdays: '10:00 AM - 9:00 PM',
      weekends: '10:30 AM - 8:30 PM'
    }
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/settings')
      .then((res) => {
        if (res.data?.data) setSettings(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings', settings);
      dispatch(addToast({ message: 'Boutique settings saved', type: 'success' }));
    } catch (err) {
      dispatch(addToast({ message: 'Failed to update settings', type: 'error' }));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
          Boutique Configuration & Settings
        </h1>
        <p className="text-xs text-stone-500">Update atelier contact information, hours, and branding</p>
      </div>

      <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Business Name</label>
            <input
              type="text"
              value={settings.businessName}
              onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Tagline</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Telephone</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">WhatsApp Number</label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1">Street Address</label>
          <input
            type="text"
            value={settings.address?.street || ''}
            onChange={(e) => setSettings({
              ...settings,
              address: { ...settings.address, street: e.target.value }
            })}
            className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Weekday Hours</label>
            <input
              type="text"
              value={settings.businessHours?.weekdays || ''}
              onChange={(e) => setSettings({
                ...settings,
                businessHours: { ...settings.businessHours, weekdays: e.target.value }
              })}
              className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Weekend Hours</label>
            <input
              type="text"
              value={settings.businessHours?.weekends || ''}
              onChange={(e) => setSettings({
                ...settings,
                businessHours: { ...settings.businessHours, weekends: e.target.value }
              })}
              className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-sm"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="py-3 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center space-x-2 shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Boutique Settings'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
