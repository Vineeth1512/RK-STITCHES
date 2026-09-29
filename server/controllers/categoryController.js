import Category from '../models/Category.js';
import { ApiError } from '../middlewares/errorHandler.js';

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ order: 1, name: 1 });
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description, image, iconName, order } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const category = await Category.create({
      name,
      slug,
      description,
      image,
      iconName,
      order: order || 0
    });

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!category) return next(new ApiError('Category not found', 404));
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return next(new ApiError('Category not found', 404));
    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
