import express from 'express';
import {
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ
} from '../controllers/faqController.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.get('/', getAllFAQs);

// Admin FAQs
router.post('/', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), createFAQ);
router.put('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateFAQ);
router.delete('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), deleteFAQ);

export default router;
