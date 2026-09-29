import express from 'express';
import {
  getAllDesigns,
  getDesignBySlug,
  toggleLike,
  createDesign,
  updateDesign,
  deleteDesign
} from '../controllers/designController.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.get('/', getAllDesigns);
router.get('/:slug', getDesignBySlug);
router.post('/:id/like', toggleLike);

// Admin CRUD
router.post('/', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), createDesign);
router.put('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateDesign);
router.delete('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), deleteDesign);

export default router;
