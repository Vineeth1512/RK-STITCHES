import express from 'express';
import {
  createMessage,
  getAllMessages,
  replyToMessage,
  deleteMessage
} from '../controllers/messageController.js';
import { protect, restrictTo, optionalAuth } from '../middlewares/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.post('/', optionalAuth, createMessage);

// Admin messages
router.get('/', protect, restrictTo(ROLES.STAFF, ROLES.ADMIN, ROLES.SUPER_ADMIN), getAllMessages);
router.patch('/:id/reply', protect, restrictTo(ROLES.STAFF, ROLES.ADMIN, ROLES.SUPER_ADMIN), replyToMessage);
router.delete('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), deleteMessage);

export default router;
