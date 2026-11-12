import mongoose from 'mongoose';
import { BOOKING_STATUS } from '../constants/status.js';

const timelineEventSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: Object.values(BOOKING_STATUS),
    required: true
  },
  title: {
    type: String,
    required: true
  },
  note: {
    type: String,
    default: ''
  },
  updatedBy: {
    type: String,
    default: 'RK Stitches Master Tailor'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      unique: true,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    customerName: {
      type: String,
      required: true,
      trim: true
    },
    customerPhone: {
      type: String,
      required: true,
      trim: true
    },
    customerEmail: {
      type: String,
      trim: true,
      lowercase: true
    },
    clothingType: {
      type: String,
      required: true,
      enum: [
        'Blouse',
        'Maggam Work Blouse',
        'Lehenga / Choli',
        'Long Frock',
        'Kurti / Salwar',
        'Langa Blouse (Pattu Pavada)',
        'School / College Uniform',
        'Western Dress',
        'Kids Wear',
        'Custom Design / Other'
      ],
      default: 'Blouse'
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    },
    serviceName: {
      type: String,
      default: ''
    },
    savedMeasurementProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Measurement'
    },
    measurementsSnapshot: {
      shoulder: Number,
      chest: Number,
      waist: Number,
      hip: Number,
      sleeveLength: Number,
      armhole: Number,
      blouseLength: Number,
      dressLength: Number,
      frontNeckDepth: Number,
      backNeckDepth: Number,
      neckType: String,
      notes: String
    },
    fabricStatus: {
      type: String,
      enum: ['CUSTOMER_PROVIDED', 'PURCHASE_REQUESTED', 'NEED_ASSISTANCE'],
      default: 'CUSTOMER_PROVIDED'
    },
    fabricDetails: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1
    },
    requiredDate: {
      type: Date,
      required: true
    },
    additionalInstructions: {
      type: String,
      default: ''
    },
    referencePhotos: [{
      type: String
    }],
    referenceVideos: [{
      type: String
    }],
    status: {
      type: String,
      enum: Object.values(BOOKING_STATUS),
      default: BOOKING_STATUS.PENDING
    },
    timeline: [timelineEventSchema],
    assignedStaff: {
      type: String,
      default: 'Unassigned'
    },
    estimatedCost: {
      type: Number,
      default: 0
    },
    advancePaid: {
      type: Number,
      default: 0
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PARTIAL', 'PAID', 'REFUNDED'],
      default: 'PENDING'
    },
    deliveryAddress: {
      street: String,
      landmark: String,
      city: String,
      state: String,
      pincode: String
    },
    pickupType: {
      type: String,
      enum: ['BOUTIQUE_PICKUP', 'HOME_DELIVERY'],
      default: 'BOUTIQUE_PICKUP'
    },
    adminNotes: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

bookingSchema.pre('validate', function (next) {
  if (!this.bookingNumber) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    this.bookingNumber = `RK-${dateStr}-${randomSuffix}`;
  }
  if (this.clothingType && typeof this.clothingType === 'string') {
    const map = {
      'blouse': 'Blouse',
      'blouses': 'Blouse',
      'maggam work': 'Maggam Work Blouse',
      'maggam work blouse': 'Maggam Work Blouse',
      'lehengas': 'Lehenga / Choli',
      'lehenga': 'Lehenga / Choli',
      'lehenga / choli': 'Lehenga / Choli',
      'long frocks': 'Long Frock',
      'long frock': 'Long Frock',
      'kurtis & suits': 'Kurti / Salwar',
      'kurtis': 'Kurti / Salwar',
      'kurti': 'Kurti / Salwar',
      'kurti / salwar': 'Kurti / Salwar',
      'langa blouses': 'Langa Blouse (Pattu Pavada)',
      'langa blouse': 'Langa Blouse (Pattu Pavada)',
      'langa blouse (pattu pavada)': 'Langa Blouse (Pattu Pavada)',
      'uniforms': 'School / College Uniform',
      'uniform': 'School / College Uniform',
      'school / college uniform': 'School / College Uniform',
      'western dress': 'Western Dress',
      'kids wear': 'Kids Wear',
      'custom design / other': 'Custom Design / Other',
      'other': 'Custom Design / Other'
    };
    const norm = map[this.clothingType.trim().toLowerCase()];
    if (norm) {
      this.clothingType = norm;
    }
  }
  next();
});

export default mongoose.model('Booking', bookingSchema);
