import express from 'express';
import { register, login, googleAuth, getMe, updateProfile, changePassword } from '../controllers/authController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/me', protect, getMe);
router.patch('/profile', protect, updateProfile);
router.patch('/change-password', protect, changePassword);

export default router;
