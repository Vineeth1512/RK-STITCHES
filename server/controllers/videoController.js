import Video from '../models/Video.js';
import { ApiError } from '../middlewares/errorHandler.js';

export const getAllVideos = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = { isPublished: true };

    if (category && category !== 'All') {
      filter.category = category;
    }

    const videos = await Video.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (error) {
    next(error);
  }
};

export const createVideo = async (req, res, next) => {
  try {
    const { title, category, videoUrl, thumbnailUrl, description, duration, tags, isPublished } = req.body;

    const video = await Video.create({
      title,
      category,
      videoUrl,
      thumbnailUrl,
      description,
      duration: duration || '1:00',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true
    });

    res.status(201).json({
      success: true,
      message: 'Video added successfully',
      data: video
    });
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) return next(new ApiError('Video not found', 404));
    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return next(new ApiError('Video not found', 404));
    res.status(200).json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
