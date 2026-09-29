import express from 'express';
import {
  getSettings,
  updateSettings
} from '../controllers/settingsController.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateSettings);

export default router;
