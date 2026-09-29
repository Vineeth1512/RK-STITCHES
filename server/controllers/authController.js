import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ApiError } from '../middlewares/errorHandler.js';
import { ROLES } from '../constants/roles.js';

const signToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'rk_stitches_super_secure_jwt_secret_key_2026_modern_fashion',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    }
  );
};

export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password || !phone) {
      return next(new ApiError('Please provide name, email, phone and password', 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ApiError('An account with this email already exists', 400));
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: ROLES.CUSTOMER
    });

    const token = signToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ApiError('Please provide email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return next(new ApiError('Invalid email or password', 401));
    }

    if (user.status === 'DISABLED') {
      return next(new ApiError('Your account has been deactivated. Please contact support.', 403));
    }

    const token = signToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const { email, name, avatar, googleId } = req.body;

    if (!email || !name) {
      return next(new ApiError('Google profile data is missing', 400));
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        phone: 'Not provided',
        password: Math.random().toString(36).slice(-8) + 'Gg!1',
        avatar: avatar || '',
        googleId: googleId || email,
        role: ROLES.CUSTOMER,
        isVerified: true
      });
    }

    const token = signToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Google login successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('addresses');
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, avatar, addresses } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (avatar) updateData.avatar = avatar;
    if (addresses) updateData.addresses = addresses;

    const user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!(await user.comparePassword(currentPassword))) {
      return next(new ApiError('Current password does not match', 400));
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};
