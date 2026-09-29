import express from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), createCategory);
router.put('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateCategory);
router.delete('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), deleteCategory);

export default router;
