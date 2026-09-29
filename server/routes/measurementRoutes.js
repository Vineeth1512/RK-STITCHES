import express from 'express';
import {
  getMyMeasurements,
  createMeasurement,
  updateMeasurement,
  deleteMeasurement,
  getMeasurementsForUser
} from '../controllers/measurementController.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.get('/my', protect, getMyMeasurements);
router.post('/', protect, createMeasurement);
router.put('/:id', protect, updateMeasurement);
router.delete('/:id', protect, deleteMeasurement);

// Admin view measurements for specific user
router.get('/user/:userId', protect, restrictTo(ROLES.STAFF, ROLES.ADMIN, ROLES.SUPER_ADMIN), getMeasurementsForUser);

export default router;
