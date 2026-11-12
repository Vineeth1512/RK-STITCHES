import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import designRoutes from './routes/designRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import measurementRoutes from './routes/measurementRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import passport from './config/passport.js';
import { errorHandler } from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS
const configuredOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((s) => s.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const defaultOrigins = [
  'https://rk-stitches.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const cleanOrigin = origin.replace(/\/+$/, '');

    const isAllowed =
      process.env.NODE_ENV === 'development' ||
      defaultOrigins.includes(cleanOrigin) ||
      configuredOrigins.includes(cleanOrigin) ||
      cleanOrigin.endsWith('.vercel.app');

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  credentials: true
}));

// Rate limiter for general requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check (supports root, /health, /api/health)
app.get(['/', '/health', '/api/health'], (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  const isHealthy = dbState === 1;

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'ok' : 'degraded',
    database: dbStatusMap[dbState] || 'unknown',
    databaseConnected: isHealthy,
    brand: 'RK STITCHES API',
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

// Guard: Fast response if database is disconnected, preventing 10s buffering timeouts
app.use('/api', (req, res, next) => {
  if (req.path === '/health' || req.path === '/health/') return next();
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database is currently disconnected. Please verify MONGODB_URI and MongoDB Atlas Network Access (whitelist 0.0.0.0/0 on Render).',
      error: 'DATABASE_DISCONNECTED'
    });
  }
  next();
});

// Initialize Passport
app.use(passport.initialize());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/measurements', measurementRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/upload', uploadRoutes);

// 404 Route handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.originalUrl}`
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
