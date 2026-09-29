import express from 'express';
import {
  getAllCustomers,
  getCustomerDetails,
  toggleCustomerStatus
} from '../controllers/userController.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.get('/customers', protect, restrictTo(ROLES.STAFF, ROLES.ADMIN, ROLES.SUPER_ADMIN), getAllCustomers);
router.get('/customers/:id', protect, restrictTo(ROLES.STAFF, ROLES.ADMIN, ROLES.SUPER_ADMIN), getCustomerDetails);
router.patch('/customers/:id/toggle-status', protect, restrictTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), toggleCustomerStatus);

export default router;
