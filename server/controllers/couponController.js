import Coupon from '../models/Coupon.js';
import { ApiError } from '../middlewares/errorHandler.js';

export const validateCoupon = async (req, res, next) => {
  try {
    const { code, amount } = req.body;
    if (!code) return next(new ApiError('Please enter a coupon code', 400));

    const coupon = await Coupon.findOne({
      code: code.toUpperCase().trim(),
      isActive: true
    });

    if (!coupon) {
      return next(new ApiError('Invalid or expired coupon code', 400));
    }

    const now = new Date();
    if (coupon.endDate < now) {
      return next(new ApiError('Coupon has expired', 400));
    }

    if (coupon.usageLimit && coupon.timesUsed >= coupon.usageLimit) {
      return next(new ApiError('Coupon usage limit reached', 400));
    }

    const orderAmount = Number(amount) || 0;
    if (coupon.minOrderAmount && orderAmount < coupon.minOrderAmount) {
      return next(new ApiError(`Minimum order amount for this coupon is ₹${coupon.minOrderAmount}`, 400));
    }

    let discount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discount = (orderAmount * coupon.discountAmount) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discountAmount;
    }

    res.status(200).json({
      success: true,
      message: 'Coupon applied successfully!',
      data: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountAmount: coupon.discountAmount,
        calculatedDiscount: Math.round(discount)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: coupons
    });
  } catch (error) {
    next(error);
  }
};

export const createCoupon = async (req, res, next) => {
  try {
    const { code, description, discountType, discountAmount, minOrderAmount, maxDiscount, endDate, usageLimit } = req.body;

    const coupon = await Coupon.create({
      code: code.toUpperCase().trim(),
      description,
      discountType,
      discountAmount: Number(discountAmount),
      minOrderAmount: Number(minOrderAmount) || 0,
      maxDiscount: Number(maxDiscount) || 0,
      endDate: new Date(endDate),
      usageLimit: Number(usageLimit) || 100
    });

    res.status(201).json({
      success: true,
      data: coupon
    });
  } catch (error) {
    next(error);
  }
};

export const updateCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!coupon) return next(new ApiError('Coupon not found', 404));
    res.status(200).json({
      success: true,
      data: coupon
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return next(new ApiError('Coupon not found', 404));
    res.status(200).json({
      success: true,
      message: 'Coupon deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
