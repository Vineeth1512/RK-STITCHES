import express from 'express';
import {
  getAllVideos,
  createVideo,
  updateVideo,
  deleteVideo
} from '../controllers/videoController.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.get('/', getAllVideos);
router.post('/', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), createVideo);
router.put('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateVideo);
router.delete('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), deleteVideo);

export default router;
