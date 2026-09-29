import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Stitching Process',
        'Before / After',
        'Design Showcase',
        'Maggam Work',
        'Customer Outfits',
        'Behind The Scenes'
      ],
      default: 'Design Showcase'
    },
    videoUrl: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    duration: {
      type: String,
      default: '0:45'
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    viewsCount: {
      type: Number,
      default: 0
    },
    tags: [{
      type: String,
      trim: true
    }]
  },
  { timestamps: true }
);

export default mongoose.model('Video', videoSchema);
