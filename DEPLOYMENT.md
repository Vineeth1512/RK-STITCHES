# RK STITCHES - Production Deployment Guide

This guide details steps to deploy RK Stitches to production environments.

---

## 1. Hosting Architecture Overview
- **Frontend**: Vercel or Netlify (React SPA with client-side routing)
- **Backend**: Render, Railway, AWS ECS, or DigitalOcean App Platform (Node.js Express)
- **Database**: MongoDB Atlas (Cloud Cluster M0 Free or M10 Dedicated)
- **Media**: Cloudinary (Free tier provides generous image/video CDN bandwidth)

---

## 2. Deploying Backend (e.g. Render / Railway)

1. Create a new **Web Service** pointing to your repository.
2. Set Root Directory to `server`.
3. Set Build Command: `npm install`
4. Set Start Command: `node server.js`
5. Configure Environment Variables in the hosting dashboard:
   ```env
   NODE_ENV=production
   PORT=5000
   CLIENT_URL=https://your-rk-stitches-frontend.vercel.app
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/rk_stitches?retryWrites=true&w=majority
   JWT_SECRET=super_secure_production_secret_key_change_this_in_production
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
6. Deploy the service and note your live API URL (e.g., `https://rk-stitches-api.onrender.com`).

---

## 3. Deploying Frontend (e.g. Vercel)

1. Create a new project on **Vercel**.
2. Set Root Directory to `client`.
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add single-page application redirect rule by including `client/vercel.json`:
   ```json
   {
     "rewrites": [
       { "source": "/api/(.*)", "destination": "https://rk-stitches-api.onrender.com/api/$1" },
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
7. Deploy the frontend.

---

## 4. Post-Deployment Verification
- Run database seed script once against MongoDB Atlas:
  ```bash
  MONGODB_URI="your_atlas_connection_string" node server/scripts/seed.js
  ```
- Test customer registration and custom stitching booking.
- Verify admin dashboard login at `/login` with credentials.
- Verify media rendering and WhatsApp click-to-chat links.
