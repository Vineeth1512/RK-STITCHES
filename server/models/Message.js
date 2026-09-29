import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      default: ''
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['General Inquiry', 'Design Customization', 'Maggam Work Query', 'Bulk / Uniforms', 'Measurement Help', 'Urgent Stitching'],
      default: 'General Inquiry'
    },
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['UNREAD', 'IN_REVIEW', 'REPLIED', 'RESOLVED'],
      default: 'UNREAD'
    },
    adminReply: {
      type: String,
      default: ''
    },
    repliedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
