import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    images: [{
      type: String
    }],
    videoUrl: {
      type: String,
      default: ''
    },
    startingPrice: {
      type: Number,
      required: true,
      min: 0
    },
    priceRange: {
      type: String,
      default: ''
    },
    estimatedDays: {
      type: String,
      default: '3-5 business days'
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    tags: [{
      type: String,
      trim: true
    }],
    features: [{
      type: String
    }],
    faq: [{
      question: String,
      answer: String
    }]
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
