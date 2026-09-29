import FAQ from '../models/FAQ.js';
import { ApiError } from '../middlewares/errorHandler.js';

export const getAllFAQs = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const filter = { isActive: true };

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { question: { $regex: search, $options: 'i' } },
        { answer: { $regex: search, $options: 'i' } }
      ];
    }

    const faqs = await FAQ.find(filter).sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      data: faqs
    });
  } catch (error) {
    next(error);
  }
};

export const createFAQ = async (req, res, next) => {
  try {
    const { question, answer, category, order } = req.body;
    const faq = await FAQ.create({
      question,
      answer,
      category,
      order: Number(order) || 0
    });

    res.status(201).json({
      success: true,
      data: faq
    });
  } catch (error) {
    next(error);
  }
};

export const updateFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faq) return next(new ApiError('FAQ not found', 404));
    res.status(200).json({
      success: true,
      data: faq
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return next(new ApiError('FAQ not found', 404));
    res.status(200).json({
      success: true,
      message: 'FAQ deleted'
    });
  } catch (error) {
    next(error);
  }
};
