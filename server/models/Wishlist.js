import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    designs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Design'
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Wishlist', wishlistSchema);
