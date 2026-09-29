import express from 'express';
import passport, { isGoogleConfigured } from '../config/passport.js';
import {
  register,
  login,
  googleAuth,
  googlePassportCallback,
  getMe,
  updateProfile,
  changePassword
} from '../controllers/authController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Passport Google OAuth 2.0 routes
router.get('/google', (req, res, next) => {
  if (!isGoogleConfigured) {
    return res.status(400).send(`
      <div style="font-family: system-ui, sans-serif; padding: 40px; max-width: 600px; margin: 50px auto; border: 1px solid #e5e7eb; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
        <h2 style="color: #b45309; margin-top: 0;">Google OAuth Configuration Required</h2>
        <p style="color: #374151; font-size: 14px; line-height: 1.6;">
          Your backend needs <strong>GOOGLE_CLIENT_SECRET</strong> in <code>server/.env</code> to connect with Google using <code>passport-google-oauth20</code>.
        </p>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 16px; border-radius: 12px; margin: 20px 0; font-size: 13px; color: #1f2937;">
          <strong>Steps to complete setup:</strong>
          <ol style="margin: 8px 0 0; padding-left: 20px; line-height: 1.8;">
            <li>In Google Cloud Console under <strong>Client secrets</strong> (right side), copy your secret.</li>
            <li>Paste into <strong>server/.env</strong>:<br/><code style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">GOOGLE_CLIENT_SECRET=your_secret_here</code></li>
            <li>Restart backend server: <code style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">npm run dev</code></li>
          </ol>
        </div>
        <a href="http://localhost:5173/login" style="display: inline-block; padding: 10px 20px; background: #b45309; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 13px;">
          ← Return to Login
        </a>
      </div>
    `);
  }
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').split(',')[0].trim().replace(/\/+$/, '');
  if (!isGoogleConfigured) {
    return res.redirect(`${clientUrl}/login?error=Google%20OAuth%20not%20configured%20on%20server`);
  }
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${clientUrl}/login?error=Google%20Login%20Failed`
  }, (err, user) => {
    if (err || !user) {
      return res.redirect(`${clientUrl}/login?error=` + encodeURIComponent(err?.message || 'Authentication failed'));
    }
    req.user = user;
    googlePassportCallback(req, res);
  })(req, res, next);
});

// Token-based Google Auth endpoint
router.post('/google', googleAuth);
router.get('/me', protect, getMe);
router.patch('/profile', protect, updateProfile);
router.patch('/change-password', protect, changePassword);

export default router;
