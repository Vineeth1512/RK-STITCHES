import mongoose from 'mongoose';

const designSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Design title is required'],
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
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    images: [{
      type: String,
      required: true
    }],
    videoUrl: {
      type: String,
      default: ''
    },
    estimatedPrice: {
      type: Number,
      default: 0
    },
    priceNote: {
      type: String,
      default: 'Stitching cost varies based on fabric & customization'
    },
    tags: [{
      type: String,
      trim: true
    }],
    fabricRecommendation: {
      type: String,
      default: 'Silk, Georgette, Organza, Cotton'
    },
    stitchingDays: {
      type: String,
      default: '4-7 days'
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    likesCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model('Design', designSchema);
