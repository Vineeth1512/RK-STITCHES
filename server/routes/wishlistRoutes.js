import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} from '../controllers/wishlistController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', protect, getWishlist);
router.post('/add', protect, addToWishlist);
router.delete('/:designId', protect, removeFromWishlist);

export default router;
