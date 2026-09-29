import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String,
      default: ''
    },
    caption: {
      type: String,
      default: ''
    },
    tags: [{
      type: String,
      trim: true
    }],
    isFeatured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model('Gallery', gallerySchema);
