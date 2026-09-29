import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Measurement from '../models/Measurement.js';
import Review from '../models/Review.js';
import { ApiError } from '../middlewares/errorHandler.js';

export const getAllCustomers = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 50 } = req.query;
    const filter = { role: 'CUSTOMER' };

    if (status && status !== 'ALL') {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomerDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ApiError('Customer not found', 404));

    const bookings = await Booking.find({
      $or: [{ user: user._id }, { customerEmail: user.email }, { customerPhone: user.phone }]
    }).sort({ createdAt: -1 });

    const measurements = await Measurement.find({ user: user._id });
    const reviews = await Review.find({ user: user._id });

    res.status(200).json({
      success: true,
      data: {
        customer: user,
        bookings,
        measurements,
        reviews
      }
    });
  } catch (error) {
    next(error);
  }
};

export const toggleCustomerStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ApiError('Customer not found', 404));

    user.status = user.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
    await user.save();

    res.status(200).json({
      success: true,
      message: `Customer account is now ${user.status}`,
      data: user
    });
  } catch (error) {
    next(error);
  }
};
