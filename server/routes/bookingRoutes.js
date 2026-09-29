import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  getAllBookings,
  updateBookingStatus,
  cancelBooking
} from '../controllers/bookingController.js';
import { protect, restrictTo, optionalAuth } from '../middlewares/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

// Public/Customer can submit custom booking (authenticated or guest with details)
router.post('/', optionalAuth, createBooking);

// Customer bookings
router.get('/my', protect, getMyBookings);
router.get('/:id', protect, getBookingById);
router.post('/:id/cancel', protect, cancelBooking);

// Admin / Staff booking management
router.get('/', protect, restrictTo(ROLES.STAFF, ROLES.ADMIN, ROLES.SUPER_ADMIN), getAllBookings);
router.patch('/:id/status', protect, restrictTo(ROLES.STAFF, ROLES.ADMIN, ROLES.SUPER_ADMIN), updateBookingStatus);

export default router;
