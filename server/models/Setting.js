import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: 'RK STITCHES'
    },
    tagline: {
      type: String,
      default: 'Exclusive Tailoring & Designer Studio for Women & Kids'
    },
    phone: {
      type: String,
      default: '+91 98765 43210'
    },
    email: {
      type: String,
      default: 'contact@rkstitches.com'
    },
    whatsapp: {
      type: String,
      default: '+919876543210'
    },
    address: {
      street: { type: String, default: 'Plot 42, Road No 10, Banjara Hills' },
      city: { type: String, default: 'Hyderabad' },
      state: { type: String, default: 'Telangana' },
      pincode: { type: String, default: '500034' },
      googleMapsUrl: { type: String, default: 'https://maps.google.com' }
    },
    businessHours: {
      weekdays: { type: String, default: '10:00 AM - 9:00 PM' },
      weekends: { type: String, default: '10:30 AM - 8:30 PM' }
    },
    socialLinks: {
      instagram: { type: String, default: 'https://instagram.com/rkstitches_official' },
      facebook: { type: String, default: 'https://facebook.com/rkstitches' },
      youtube: { type: String, default: 'https://youtube.com/@rkstitches' },
      whatsapp: { type: String, default: 'https://wa.me/919876543210' }
    },
    logo: {
      type: String,
      default: ''
    },
    heroHeading: {
      type: String,
      default: 'Master Tailoring & Haute Couture Embroidery'
    },
    heroSubheading: {
      type: String,
      default: 'From regal bridal lehengas and intricate maggam work blouses to contemporary everyday silhouettes, we stitch your dreams with impeccable precision.'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Setting', settingSchema);
