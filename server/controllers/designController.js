import Design from '../models/Design.js';
import Wishlist from '../models/Wishlist.js';
import { ApiError } from '../middlewares/errorHandler.js';

export const getAllDesigns = async (req, res, next) => {
  try {
    const { category, search, featured, tag, limit = 50, page = 1 } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }
    if (tag) {
      filter.tags = tag;
    }
    if (featured === 'true') {
      filter.isFeatured = true;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Design.countDocuments(filter);
    const designs = await Design.find(filter)
      .sort({ isFeatured: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: designs
    });
  } catch (error) {
    next(error);
  }
};

export const getDesignBySlug = async (req, res, next) => {
  try {
    const design = await Design.findOne({ slug: req.params.slug });
    if (!design) {
      return next(new ApiError('Design not found', 404));
    }
    res.status(200).json({
      success: true,
      data: design
    });
  } catch (error) {
    next(error);
  }
};

export const toggleLike = async (req, res, next) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) {
      return next(new ApiError('Design not found', 404));
    }

    design.likesCount = (design.likesCount || 0) + 1;
    await design.save();

    res.status(200).json({
      success: true,
      likesCount: design.likesCount
    });
  } catch (error) {
    next(error);
  }
};

export const createDesign = async (req, res, next) => {
  try {
    const { title, category, description, images, videoUrl, estimatedPrice, priceNote, tags, fabricRecommendation, stitchingDays, isFeatured } = req.body;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const design = await Design.create({
      title,
      slug,
      category,
      description,
      images: Array.isArray(images) ? images : [images],
      videoUrl: videoUrl || '',
      estimatedPrice: Number(estimatedPrice) || 0,
      priceNote,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      fabricRecommendation,
      stitchingDays,
      isFeatured: Boolean(isFeatured)
    });

    res.status(201).json({
      success: true,
      message: 'Design added successfully',
      data: design
    });
  } catch (error) {
    next(error);
  }
};

export const updateDesign = async (req, res, next) => {
  try {
    const design = await Design.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!design) {
      return next(new ApiError('Design not found', 404));
    }
    res.status(200).json({
      success: true,
      message: 'Design updated successfully',
      data: design
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDesign = async (req, res, next) => {
  try {
    const design = await Design.findByIdAndDelete(req.params.id);
    if (!design) {
      return next(new ApiError('Design not found', 404));
    }
    res.status(200).json({
      success: true,
      message: 'Design deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
