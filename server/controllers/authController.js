import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import { ApiError } from '../middlewares/errorHandler.js';
import { ROLES } from '../constants/roles.js';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
    const { name, email, phone, password, isStaff, staffPasscode } = req.body;

    if (!name || !email || !password || !phone) {
      return next(new ApiError('Please provide name, email, phone and password', 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ApiError('An account with this email already exists', 400));
    }

    let role = ROLES.CUSTOMER;
    if (isStaff) {
      const validKey = process.env.STAFF_SECRET_KEY || 'RKSTAFF2026';
      if (!staffPasscode || staffPasscode.trim() !== validKey) {
        return next(new ApiError('Invalid Boutique Staff Passcode. Please contact the administrator.', 400));
      }
      role = ROLES.STAFF;
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role
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
    let email = req.body.email;
    let name = req.body.name;
    let avatar = req.body.avatar;
    let googleId = req.body.googleId;

    // 1. If Google credential ID Token is provided by Google Identity Services
    if (req.body.credential) {
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken: req.body.credential,
          audience: process.env.GOOGLE_CLIENT_ID || undefined
        });
        const payload = ticket.getPayload();
        if (payload) {
          email = payload.email;
          name = payload.name;
          avatar = payload.picture;
          googleId = payload.sub;
        }
      } catch (verifyError) {
        // Fallback: verify via Google tokeninfo endpoint
        try {
          const tokeninfoRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${req.body.credential}`);
          if (tokeninfoRes.ok) {
            const data = await tokeninfoRes.json();
            email = data.email;
            name = data.name;
            avatar = data.picture;
            googleId = data.sub;
          } else {
            return next(new ApiError('Invalid Google credential token', 401));
          }
        } catch (fetchErr) {
          return next(new ApiError('Failed to verify Google token: ' + verifyError.message, 401));
        }
      }
    }

    if (!email) {
      return next(new ApiError('Google profile email is missing or could not be verified', 400));
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        phone: req.body.phone || '',
        avatar: avatar || '',
        googleId: googleId || email,
        role: ROLES.CUSTOMER,
        isVerified: true
      });
    } else {
      // User exists: link googleId and avatar if not already set
      let updated = false;
      if (!user.googleId && googleId) {
        user.googleId = googleId;
        updated = true;
      }
      if (!user.avatar && avatar) {
        user.avatar = avatar;
        updated = true;
      }
      if (updated) {
        await user.save();
      }
    }

    if (user.status === 'DISABLED') {
      return next(new ApiError('Your account has been deactivated. Please contact support.', 403));
    }

    const token = signToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Google authentication successful',
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

export const googlePassportCallback = (req, res) => {
  try {
    const user = req.user;
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

    if (!user) {
      return res.redirect(`${clientUrl}/login?error=Google%20authentication%20failed`);
    }

    const token = signToken(user._id);
    const userData = encodeURIComponent(
      JSON.stringify({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        avatar: user.avatar || ''
      })
    );

    res.redirect(`${clientUrl}/login?token=${token}&user=${userData}`);
  } catch (err) {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${clientUrl}/login?error=${encodeURIComponent(err.message)}`);
  }
};
