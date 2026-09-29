import Review from '../models/Review.js';
import Testimonial from '../models/Testimonial.js';
import { ApiError } from '../middlewares/errorHandler.js';

export const getApprovedReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ isApproved: true })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    const testimonials = await Testimonial.find({ isFeatured: true }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      data: {
        customerReviews: reviews,
        featuredTestimonials: testimonials
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { bookingId, serviceId, serviceName, rating, comment, photos, videoUrl } = req.body;

    if (!rating || !comment) {
      return next(new ApiError('Please provide both rating and review text', 400));
    }

    const review = await Review.create({
      user: req.user._id,
      authorName: req.user.name,
      booking: bookingId || null,
      service: serviceId || null,
      serviceName: serviceName || 'Boutique Stitching',
      rating: Number(rating),
      comment,
      photos: photos || [],
      videoUrl: videoUrl || '',
      isApproved: false // Moderated by default
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your review has been submitted for verification.',
      data: review
    });
  } catch (error) {
    next(error);
  }
};

export const getAllReviewsForAdmin = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate('user', 'name email phone').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

export const moderateReview = async (req, res, next) => {
  try {
    const { isApproved, isFeatured } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved, isFeatured },
      { new: true }
    );
    if (!review) return next(new ApiError('Review not found', 404));

    res.status(200).json({
      success: true,
      message: 'Review moderation updated',
      data: review
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return next(new ApiError('Review not found', 404));
    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
