import express from 'express';
import { getDashboardStats } from '../controllers/analyticsController.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.get('/dashboard', protect, restrictTo(ROLES.STAFF, ROLES.ADMIN, ROLES.SUPER_ADMIN), getDashboardStats);

export default router;
