import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Notification from '../models/Notification.js';
import { BOOKING_STATUS } from '../constants/status.js';
import { ApiError } from '../middlewares/errorHandler.js';

export const createBooking = async (req, res, next) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      clothingType,
      service,
      serviceName,
      savedMeasurementProfile,
      measurementsSnapshot,
      fabricStatus,
      fabricDetails,
      color,
      quantity,
      requiredDate,
      additionalInstructions,
      referencePhotos,
      referenceVideos,
      deliveryAddress,
      pickupType
    } = req.body;

    if (!customerName || !customerPhone || !clothingType || !requiredDate) {
      return next(new ApiError('Please provide name, phone, clothing type and required date', 400));
    }

    const initialTimeline = [
      {
        status: BOOKING_STATUS.PENDING,
        title: 'Booking Request Submitted',
        note: 'We have received your custom stitching order. Our master tailor will review details shortly.',
        updatedBy: 'System',
        timestamp: new Date()
      }
    ];

    const safeProfileId = (savedMeasurementProfile && mongoose.Types.ObjectId.isValid(savedMeasurementProfile))
      ? savedMeasurementProfile
      : null;
    const safeServiceId = (service && mongoose.Types.ObjectId.isValid(service))
      ? service
      : null;

    const booking = await Booking.create({
      user: req.user ? req.user._id : null,
      customerName,
      customerPhone,
      customerEmail: customerEmail || (req.user ? req.user.email : ''),
      clothingType,
      service: safeServiceId,
      serviceName: serviceName || clothingType,
      savedMeasurementProfile: safeProfileId,
      measurementsSnapshot: measurementsSnapshot || {},
      fabricStatus: fabricStatus || 'CUSTOMER_PROVIDED',
      fabricDetails: fabricDetails || '',
      color: color || '',
      quantity: Number(quantity) || 1,
      requiredDate: new Date(requiredDate),
      additionalInstructions: additionalInstructions || '',
      referencePhotos: referencePhotos || [],
      referenceVideos: referenceVideos || [],
      deliveryAddress: deliveryAddress || {},
      pickupType: pickupType || 'BOUTIQUE_PICKUP',
      status: BOOKING_STATUS.PENDING,
      timeline: initialTimeline
    });

    // Create notification if user is authenticated (wrapped so it won't fail the booking if notification fails)
    if (req.user) {
      try {
        await Notification.create({
          user: req.user._id,
          title: 'Booking Request Received',
          message: `Your booking #${booking.bookingNumber} for ${booking.clothingType} has been submitted successfully.`,
          type: 'BOOKING_UPDATE',
          bookingId: booking._id,
          link: `/dashboard/bookings/${booking._id}`
        });
      } catch (notifErr) {
        console.warn('[Booking] Could not create in-app notification:', notifErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Booking submitted successfully',
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      $or: [
        { user: req.user._id },
        { customerEmail: req.user.email },
        { customerPhone: req.user.phone }
      ]
    })
      .populate('service')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('service')
      .populate('user', 'name email phone')
      .populate('savedMeasurementProfile');

    if (!booking) {
      return next(new ApiError('Booking not found', 404));
    }

    // Authorization: User can only view their own booking unless staff/admin
    const isOwner = req.user && (
      (booking.user && booking.user._id.toString() === req.user._id.toString()) ||
      booking.customerEmail === req.user.email ||
      booking.customerPhone === req.user.phone
    );
    const isStaffOrAdmin = req.user && ['STAFF', 'ADMIN', 'SUPER_ADMIN'].includes(req.user.role);

    if (!isOwner && !isStaffOrAdmin) {
      return next(new ApiError('Not authorized to access this booking', 403));
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const { status, search, clothingType, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (status && status !== 'ALL') {
      filter.status = status;
    }
    if (clothingType && clothingType !== 'ALL') {
      filter.clothingType = clothingType;
    }
    if (search) {
      filter.$or = [
        { bookingNumber: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { customerPhone: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Booking.countDocuments(filter);
    const bookings = await Booking.find(filter)
      .populate('service', 'name category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status, note, assignedStaff, estimatedCost, advancePaid, paymentStatus } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new ApiError('Booking not found', 404));
    }

    if (status && status !== booking.status) {
      const statusTitles = {
        CONFIRMED: 'Booking Confirmed by Tailor',
        MEASUREMENTS_REQUIRED: 'Measurements Required for Tailoring',
        IN_PROGRESS: 'Stitching and Crafting Started',
        READY: 'Outfit Ready for Trial & Pickup',
        COMPLETED: 'Delivered & Handed Over',
        CANCELLED: 'Booking Cancelled'
      };

      booking.status = status;
      booking.timeline.push({
        status,
        title: statusTitles[status] || `Status updated to ${status}`,
        note: note || `Order updated by ${req.user.name}`,
        updatedBy: req.user.name,
        timestamp: new Date()
      });

      // Send notification to customer if booking has user or email
      if (booking.user) {
        const statusMessages = {
          CONFIRMED: 'Your custom stitching request has been confirmed by our master tailor.',
          MEASUREMENTS_REQUIRED: 'Please provide or update your measurements so we can begin cutting.',
          IN_PROGRESS: 'Great news! Your outfit is currently being stitched with expert care.',
          READY: 'Your handcrafted outfit is ready! Visit our boutique or prepare for delivery.',
          COMPLETED: 'Your order has been completed. Thank you for choosing RK Stitches!',
          CANCELLED: 'Your booking has been cancelled. Contact support for inquiries.'
        };

        await Notification.create({
          user: booking.user,
          title: `Booking #${booking.bookingNumber} Update: ${status}`,
          message: statusMessages[status] || `Your order status is now ${status}.`,
          type: 'BOOKING_UPDATE',
          bookingId: booking._id,
          link: `/dashboard/bookings/${booking._id}`
        });
      }
    }

    if (assignedStaff) booking.assignedStaff = assignedStaff;
    if (estimatedCost !== undefined) booking.estimatedCost = Number(estimatedCost);
    if (advancePaid !== undefined) booking.advancePaid = Number(advancePaid);
    if (paymentStatus) booking.paymentStatus = paymentStatus;
    if (note && !status) {
      booking.adminNotes = note;
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return next(new ApiError('Booking not found', 404));

    booking.status = BOOKING_STATUS.CANCELLED;
    booking.timeline.push({
      status: BOOKING_STATUS.CANCELLED,
      title: 'Booking Cancelled by Customer',
      note: req.body.reason || 'Customer requested cancellation',
      updatedBy: req.user.name,
      timestamp: new Date()
    });

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    next(error);
  }
};
