import Gallery from '../models/Gallery.js';
import { ApiError } from '../middlewares/errorHandler.js';

export const getAllGallery = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }
    if (featured === 'true') {
      filter.isFeatured = true;
    }

    const items = await Gallery.find(filter).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

export const createGalleryItem = async (req, res, next) => {
  try {
    const { title, category, imageUrl, thumbnailUrl, caption, tags, isFeatured, order } = req.body;

    const item = await Gallery.create({
      title,
      category,
      imageUrl,
      thumbnailUrl: thumbnailUrl || imageUrl,
      caption,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      isFeatured: Boolean(isFeatured),
      order: Number(order) || 0
    });

    res.status(201).json({
      success: true,
      message: 'Gallery item added successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

export const updateGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return next(new ApiError('Gallery item not found', 404));
    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return next(new ApiError('Gallery item not found', 404));
    res.status(200).json({
      success: true,
      message: 'Gallery photo deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
