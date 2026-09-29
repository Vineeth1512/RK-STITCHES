import Service from '../models/Service.js';
import { ApiError } from '../middlewares/errorHandler.js';

export const getAllServices = async (req, res, next) => {
  try {
    const { category, search, featured, sort } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (featured === 'true') {
      filter.isFeatured = true;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    let query = Service.find(filter);

    if (sort === 'price-low') {
      query = query.sort({ startingPrice: 1 });
    } else if (sort === 'price-high') {
      query = query.sort({ startingPrice: -1 });
    } else {
      query = query.sort({ isFeatured: -1, createdAt: -1 });
    }

    const services = await query;

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      return next(new ApiError('Service not found', 404));
    }
    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const { name, category, shortDescription, description, startingPrice, priceRange, estimatedDays, isFeatured, tags, features, images, videoUrl } = req.body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const service = await Service.create({
      name,
      slug,
      category,
      shortDescription,
      description,
      startingPrice: Number(startingPrice) || 0,
      priceRange,
      estimatedDays,
      isFeatured: Boolean(isFeatured),
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      features: Array.isArray(features) ? features : (features ? features.split(',').map(f => f.trim()) : []),
      images: images || [],
      videoUrl: videoUrl || ''
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!service) {
      return next(new ApiError('Service not found', 404));
    }
    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return next(new ApiError('Service not found', 404));
    }
    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
