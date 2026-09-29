import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      default: 'Hyderabad'
    },
    occasion: {
      type: String,
      default: 'Bridal & Occasion Wear'
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
    },
    reviewText: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: ''
    },
    outfitPhoto: {
      type: String,
      default: ''
    },
    isFeatured: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);
