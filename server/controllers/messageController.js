import Message from '../models/Message.js';
import { ApiError } from '../middlewares/errorHandler.js';

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, category, message } = req.body;

    if (!name || !email || !subject || !message) {
      return next(new ApiError('Please complete all required fields', 400));
    }

    const newMsg = await Message.create({
      user: req.user ? req.user._id : null,
      name,
      email,
      phone: phone || '',
      subject,
      category: category || 'General Inquiry',
      message
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received. Our team will contact you promptly!',
      data: newMsg
    });
  } catch (error) {
    next(error);
  }
};

export const getAllMessages = async (req, res, next) => {
  try {
    const { status, category } = req.query;
    const filter = {};
    if (status && status !== 'ALL') filter.status = status;
    if (category && category !== 'ALL') filter.category = category;

    const messages = await Message.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

export const replyToMessage = async (req, res, next) => {
  try {
    const { reply } = req.body;
    const message = await Message.findById(req.params.id);

    if (!message) return next(new ApiError('Message not found', 404));

    message.adminReply = reply;
    message.status = 'REPLIED';
    message.repliedAt = new Date();
    await message.save();

    res.status(200).json({
      success: true,
      message: 'Reply saved and logged',
      data: message
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return next(new ApiError('Message not found', 404));

    res.status(200).json({
      success: true,
      message: 'Message deleted'
    });
  } catch (error) {
    next(error);
  }
};
