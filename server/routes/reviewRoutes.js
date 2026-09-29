import express from 'express';
import {
  getApprovedReviews,
  createReview,
  getAllReviewsForAdmin,
  moderateReview,
  deleteReview
} from '../controllers/reviewController.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.get('/', getApprovedReviews);
router.post('/', protect, createReview);

// Admin review moderation
router.get('/admin', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), getAllReviewsForAdmin);
router.patch('/:id/moderate', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), moderateReview);
router.delete('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), deleteReview);

export default router;
