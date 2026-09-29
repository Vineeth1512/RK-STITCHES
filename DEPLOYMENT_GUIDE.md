# RK STITCHES - Deployment Guide (Vercel & Render)

This guide covers deploying the **Frontend to Vercel** and the **Backend to Render** using MongoDB Atlas.

---

## Architecture Overview

```
[ Customer / Admin Browser ]
         │
         ├─── Frontend (React + Vite) ──────► Vercel (https://your-frontend.vercel.app)
         │
         └─── Backend API (Express/Node) ───► Render (https://your-backend.onrender.com)
                                                      │
                                                      ├─── MongoDB Atlas (Database)
                                                      ├─── Cloudinary (Images/Videos)
                                                      └─── Google OAuth (Passport.js)
```

---

## Step 1: Prepare MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in or create a free cluster.
2. In **Network Access**, click **Add IP Address** → Select **Allow Access From Anywhere** (`0.0.0.0/0`) → Confirm.
   *(This is required because Render uses dynamic IP addresses).*
3. In **Database Access**, create a user (e.g., `rk_admin`) with a secure password.
4. Click **Connect** → **Drivers** → Copy your connection string:
   ```
   mongodb+srv://rk_admin:<password>@cluster0.mongodb.net/rk_stitches?retryWrites=true&w=majority
   ```

---

## Step 2: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** → **Web Service**.
2. Connect your GitHub repository: `RK_STETCHES`.
3. Configure the following service settings:
   - **Name**: `rk-stitches-backend` *(or your preferred name)*
   - **Root Directory**: `server` ⚠️ *(Crucial)*
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: `Free`
4. Expand **Advanced** → **Add Environment Variables**:

| Variable Name | Value / Description | Example |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | `production` |
| `PORT` | `5000` *(Render provides its own, 5000 is safe default)* | `5000` |
| `MONGODB_URI` | Your MongoDB Atlas connection string from Step 1 | `mongodb+srv://...` |
| `JWT_SECRET` | Any random 32+ character secure string | `rk_secret_jwt_prod_key_2026_xyz` |
| `JWT_EXPIRES_IN` | `7d` | `7d` |
| `CLIENT_URL` | Your Vercel frontend URL *(set after Step 3, or temporary)* | `https://your-app.vercel.app` |
| `STAFF_SECRET_KEY` | Boutique staff passcode | `RKSTAFF2026` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `78677535353-...` |
| `GOOGLE_CLIENT_SECRET`| Google OAuth Client Secret | *(from Google Cloud Console)* |
| `GOOGLE_CALLBACK_URL` | `https://<YOUR-RENDER-NAME>.onrender.com/api/auth/google/callback` | *(update after Render generates URL)* |
| `CLOUDINARY_CLOUD_NAME`| Cloudinary Cloud Name *(optional for persistent images)* | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `your_api_key` |
| `CLOUDINARY_API_SECRET`| Cloudinary API Secret | `your_api_secret` |

5. Click **Create Web Service**.
6. Wait 1–2 minutes for the build to finish. Once live, copy your backend URL:
   `https://rk-stitches-backend.onrender.com`

---

## Step 3: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/) and click **Add New...** → **Project**.
2. Select your `RK_STETCHES` repository.
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click **Edit** → select `client` ⚠️ *(Crucial)*
   - **Build Command**: `npm run build` *(auto-detected)*
   - **Output Directory**: `dist` *(auto-detected)*
4. Under **Environment Variables**, add:

| Key | Value |
| :--- | :--- |
| `VITE_API_URL` | Your Render Backend URL + `/api`<br/>e.g. `https://rk-stitches-backend.onrender.com/api` |
| `VITE_GOOGLE_CLIENT_ID` | `78677535353-h3p04l3pb23so4f08iscu1u60q2qejln.apps.googleusercontent.com` |

5. Click **Deploy**.
6. Vercel will build and deploy the React app. You will receive your live domain:
   `https://rk-stitches.vercel.app`

---

## Step 4: Final Linkage & Verification

1. **Update Render `CLIENT_URL`**:
   - Go to your Render service → **Environment** tab.
   - Set `CLIENT_URL` to your Vercel URL: `https://rk-stitches.vercel.app`.
   - Save changes (Render will automatically redeploy with the new origin).

2. **Update Google Cloud Console (if using Google Login)**:
   - Go to [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials).
   - Edit your **Web Application Client ID**:
     - **Authorized JavaScript origins**:
       - `https://rk-stitches.vercel.app`
       - `https://rk-stitches-backend.onrender.com`
     - **Authorized redirect URIs**:
       - `https://rk-stitches-backend.onrender.com/api/auth/google/callback`

3. **(Optional) Seed Default Data to Production MongoDB**:
   To populate initial tailoring services, categories, and the master admin account (`admin@rkstitches.com` / `Admin@123456`) into your MongoDB Atlas database:
   From your local terminal:
   ```bash
   cd server
   # Temporarily set your Atlas URI and run seed:
   $env:MONGODB_URI="your_mongodb_atlas_connection_string"
   npm run seed
   ```

---

## Pre-Configured Files in this Repo

- **`client/vercel.json`**: Configured with single-page app rewrites so refreshing `/admin/bookings`, `/dashboard`, or any custom stitching route never returns 404.
- **`client/src/services/api.js`**: Dynamically binds to `VITE_API_URL`.
- **`render.yaml`**: Pre-configured Blueprint for 1-click Render web service provisioning.
- **`server/app.js`**: CORS pre-configured to automatically allow Vercel domains (`*.vercel.app`) and support `/health` and `/` endpoints.
