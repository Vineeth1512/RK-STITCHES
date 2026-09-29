import express from 'express';
import {
  getAllGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from '../controllers/galleryController.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.get('/', getAllGallery);
router.post('/', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), createGalleryItem);
router.put('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateGalleryItem);
router.delete('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), deleteGalleryItem);

export default router;
