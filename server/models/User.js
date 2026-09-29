import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ROLES } from '../constants/roles.js';

const addressSchema = new mongoose.Schema({
  street: { type: String, trim: true },
  landmark: { type: String, trim: true },
  city: { type: String, default: 'Hyderabad' },
  state: { type: String, default: 'Telangana' },
  pincode: { type: String, trim: true },
  isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
    },
    phone: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      trim: true,
      default: ''
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      minlength: [6, 'Password must be at least 6 characters'],
      select: false
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CUSTOMER
    },
    avatar: {
      type: String,
      default: ''
    },
    addresses: [addressSchema],
    isVerified: {
      type: Boolean,
      default: true
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'DISABLED'],
      default: 'ACTIVE'
    },
    googleId: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
