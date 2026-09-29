import Wishlist from '../models/Wishlist.js';
import Design from '../models/Design.js';
import { ApiError } from '../middlewares/errorHandler.js';

export const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
      path: 'designs',
      select: 'title slug category images estimatedPrice priceNote tags isFeatured fabricRecommendation'
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, designs: [] });
    }

    const validDesigns = (wishlist.designs || []).filter(Boolean);

    res.status(200).json({
      success: true,
      count: validDesigns.length,
      data: validDesigns
    });
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const { designId } = req.body;
    if (!designId) {
      return next(new ApiError('Design ID is required', 400));
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, designs: [] });
    }

    const alreadyIn = wishlist.designs.some(
      (id) => id && id.toString() === designId.toString()
    );

    if (!alreadyIn) {
      wishlist.designs.push(designId);
      await wishlist.save();
      await Design.findByIdAndUpdate(designId, { $inc: { likesCount: 1 } });
    }

    const populated = await Wishlist.findById(wishlist._id).populate({
      path: 'designs',
      select: 'title slug category images estimatedPrice priceNote tags isFeatured fabricRecommendation'
    });

    const validDesigns = (populated?.designs || []).filter(Boolean);

    res.status(200).json({
      success: true,
      message: 'Design added to your wishlist',
      count: validDesigns.length,
      data: validDesigns
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { designId } = req.params;
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (wishlist) {
      wishlist.designs = wishlist.designs.filter(
        (id) => id && id.toString() !== designId.toString()
      );
      await wishlist.save();
    }

    const populated = await Wishlist.findById(wishlist._id).populate({
      path: 'designs',
      select: 'title slug category images estimatedPrice priceNote tags isFeatured fabricRecommendation'
    });

    const validDesigns = (populated?.designs || []).filter(Boolean);

    res.status(200).json({
      success: true,
      message: 'Design removed from wishlist',
      count: validDesigns.length,
      data: validDesigns
    });
  } catch (error) {
    next(error);
  }
};
