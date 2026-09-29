import express from 'express';
import {
  getMyNotifications,
  markAsRead,
  markAllAsRead
} from '../controllers/notificationController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/my', protect, getMyNotifications);
router.patch('/:id/read', protect, markAsRead);
router.patch('/read-all', protect, markAllAsRead);

export default router;
