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

    res.status(200).json({
      success: true,
      count: wishlist.designs.length,
      data: wishlist.designs
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

    if (!wishlist.designs.includes(designId)) {
      wishlist.designs.push(designId);
      await wishlist.save();
      await Design.findByIdAndUpdate(designId, { $inc: { likesCount: 1 } });
    }

    const populated = await Wishlist.findById(wishlist._id).populate('designs');

    res.status(200).json({
      success: true,
      message: 'Design added to your wishlist',
      data: populated.designs
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
        (id) => id.toString() !== designId
      );
      await wishlist.save();
    }

    const populated = await Wishlist.findById(wishlist._id).populate('designs');

    res.status(200).json({
      success: true,
      message: 'Design removed from wishlist',
      data: populated ? populated.designs : []
    });
  } catch (error) {
    next(error);
  }
};
