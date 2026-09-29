import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ApiError } from './errorHandler.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(new ApiError('You are not logged in. Please log in to access this resource.', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rk_stitches_super_secure_jwt_secret_key_2026_modern_fashion');
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(new ApiError('The user belonging to this token no longer exists.', 401));
    }

    if (currentUser.status === 'DISABLED') {
      return next(new ApiError('Your account has been deactivated. Please contact support.', 403));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    next(new ApiError('Authentication failed. Please log in again.', 401));
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rk_stitches_super_secure_jwt_secret_key_2026_modern_fashion');
      const currentUser = await User.findById(decoded.id);
      if (currentUser && currentUser.status !== 'DISABLED') {
        req.user = currentUser;
      }
    }
    next();
  } catch (err) {
    // optional, proceed without error
    next();
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ApiError('You do not have permission to perform this action.', 403)
      );
    }
    next();
  };
};
