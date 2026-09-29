import mongoose from 'mongoose';

const measurementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    profileTitle: {
      type: String,
      required: [true, 'Profile title is required (e.g., Wedding Blouse Measurements)'],
      trim: true
    },
    clothingType: {
      type: String,
      required: true,
      default: 'Blouse'
    },
    unit: {
      type: String,
      enum: ['inches', 'cm'],
      default: 'inches'
    },
    // Measurements
    shoulder: { type: Number, default: 0 },
    chest: { type: Number, default: 0 },
    waist: { type: Number, default: 0 },
    hip: { type: Number, default: 0 },
    sleeveLength: { type: Number, default: 0 },
    armhole: { type: Number, default: 0 },
    sleeveRound: { type: Number, default: 0 },
    blouseLength: { type: Number, default: 0 },
    dressLength: { type: Number, default: 0 },
    frontNeckDepth: { type: Number, default: 0 },
    backNeckDepth: { type: Number, default: 0 },
    neckType: { type: String, default: 'Round / U-Shape' },
    frontCross: { type: Number, default: 0 },
    bottomRound: { type: Number, default: 0 },
    customNotes: { type: String, default: '' },
    isDefault: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Measurement', measurementSchema);
