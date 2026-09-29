import express from 'express';
import {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.get('/', getAllServices);
router.get('/:slug', getServiceBySlug);

// Admin / Staff CRUD
router.post('/', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), createService);
router.put('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateService);
router.delete('/:id', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), deleteService);

export default router;
