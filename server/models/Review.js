import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    },
    serviceName: {
      type: String,
      default: 'Custom Stitching'
    },
    authorName: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true
    },
    photos: [{
      type: String
    }],
    videoUrl: {
      type: String,
      default: ''
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
