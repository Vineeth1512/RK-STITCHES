import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();

import User from '../models/User.js';
import { ROLES } from '../constants/roles.js';

const clientID = process.env.GOOGLE_CLIENT_ID || '';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
export const isGoogleConfigured = Boolean(clientID && clientSecret);

// Serialize & deserialize user for session support if needed
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Configure Google OAuth 2.0 Strategy
if (clientID && clientSecret) {
  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName || `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim();
          const avatar = profile.photos?.[0]?.value || '';
          const googleId = profile.id;

          if (!email) {
            return done(new Error('No email found in Google profile'), null);
          }

          let user = await User.findOne({ email });

          if (!user) {
            user = await User.create({
              name: name || email.split('@')[0],
              email,
              phone: '',
              avatar,
              googleId,
              role: ROLES.CUSTOMER,
              isVerified: true
            });
          } else {
            let updated = false;
            if (!user.googleId) {
              user.googleId = googleId;
              updated = true;
            }
            if (!user.avatar && avatar) {
              user.avatar = avatar;
              updated = true;
            }
            if (updated) {
              await user.save();
            }
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
  console.log('[Passport] passport-google-oauth20 strategy registered successfully.');
} else {
  console.warn('[Passport] passport-google-oauth20 pending: GOOGLE_CLIENT_SECRET is required in server/.env');
}

export default passport;
