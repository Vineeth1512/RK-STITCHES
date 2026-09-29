import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    discountType: {
      type: String,
      enum: ['PERCENTAGE', 'FIXED'],
      default: 'PERCENTAGE'
    },
    discountAmount: {
      type: Number,
      required: true,
      min: 0
    },
    minOrderAmount: {
      type: Number,
      default: 0
    },
    maxDiscount: {
      type: Number,
      default: 0
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      required: true
    },
    usageLimit: {
      type: Number,
      default: 100
    },
    timesUsed: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Coupon', couponSchema);
