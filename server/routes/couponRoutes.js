import express from 'express';
import {
  validateCoupon,
  getAllCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon
} from '../controllers/couponController.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.post('/validate', validateCoupon);

// Admin coupons
router.get('/', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), getAllCoupons);
router.post('/', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), createCoupon);
router.put('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateCoupon);
router.delete('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), deleteCoupon);

export default router;
