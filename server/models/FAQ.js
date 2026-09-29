import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true
    },
    answer: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Stitching',
        'Measurements',
        'Delivery',
        'Payments',
        'Maggam Work',
        'Custom Designs',
        'Alterations'
      ],
      default: 'Stitching'
    },
    order: {
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

export default mongoose.model('FAQ', faqSchema);
