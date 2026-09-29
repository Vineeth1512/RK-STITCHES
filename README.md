# RK STITCHES - Haute Couture & Bespoke Tailoring Studio

**RK STITCHES** is a full-stack production-ready MERN platform for a professional tailoring and bespoke stitching business specializing in women’s and children’s clothing, designer blouses, bridal lehengas, handcrafted maggam & aari work, long frocks, traditional South Indian pattu pavada sets, and uniforms.

---

## 🌟 Key Features

### 1. Visual Brand & UI/UX Excellence
- **Luxury Fashion Aesthetics**: Tailoring-inspired visual identity with gold needle/thread motifs and warm amber/rose palette.
- **Complete Dark & Light Mode**: Seamless theme switching with localStorage persistence and zero flash of incorrect theme (FOUC).
- **Responsive Architecture**: Mobile-first design with a dedicated customer bottom navigation bar on handheld screens.
- **Interactive Before/After Slider**: Draggable fabric-to-finished-dress transformation showcase.
- **Masonry Lookbook Gallery**: High-resolution gallery with interactive zoom and lightbox view.
- **Behind the Seams Video Showcase**: Video player modal highlighting drafting, cutting, and maggam embroidery techniques.

### 2. Tailoring & Custom Stitching Systems
- **Multi-Step Custom Stitching Wizard**:
  1. *Garment & Fabric Details*: Select clothing type, fabric status (customer-provided vs. sourced), colors, and yardage descriptions.
  2. *Measurement Module*: Choose between saved customer measurement profiles, enter manual inch dimensions (shoulder, bust, waist, sleeves, armholes, necklines), or opt for physical sample garment handover.
  3. *Reference Uploads*: Attach reference photos (Instagram, Pinterest, camera photos) and special tailoring instructions.
  4. *Target Dates & Delivery*: Choose between Banjara Hills boutique pickup or doorstep delivery, apply promo discount coupons, and generate a real-time tracking number (e.g., `RK-260929-8354`).
- **Visual Order Tracker**: Live milestone timeline tracking each stage:
  `Booking Created` ➔ `Booking Confirmed` ➔ `Measurements Checked` ➔ `Stitching Started` ➔ `Quality Check & Ready` ➔ `Delivered`.

### 3. Customer Portal
- **Dashboard Overview**: Active bookings, completed orders, saved measurement count, and free alterations guarantee.
- **Measurement Profile Manager**: Create, update, and reuse multiple named sizing profiles (e.g., *"Wedding Blouse Perfect Fit"*, *"Daily Kurti"*).
- **Wishlist & Direct Booking**: Save designer patterns and convert them directly into custom stitching orders with one click.
- **Live Notifications**: Immediate updates when order status changes or tailor notes are added.
- **Order Reviews**: 1–5 star ratings, feedback, and verified customer testimonials.

### 4. Admin Management Studio
- **Role-Based Access Control (RBAC)**: Secure routes restricted to `STAFF`, `ADMIN`, and `SUPER_ADMIN`.
- **Order Workflow Control**: Search, filter, update milestone status, assign master tailors, add customer-visible notes, and manage cost and advances.
- **Services Catalog CRUD**: Manage base prices, price ranges, turnaround days, and features.
- **Fashion Collections CRUD**: Manage lookbook designs, fabric recommendations, and pricing.
- **Media Showcase Management**: Add and organize gallery photos and video showcase entries.
- **Customer Directory**: View customer profiles, order history, and activate/deactivate accounts.
- **Review Moderation**: Approve or reject customer reviews before they appear on the live site.
- **Coupons & Promo Codes**: Create percentage or fixed discount coupons with usage limits and expiry dates.
- **FAQ Management & Contact Inquiries**: Manage searchable accordion FAQs and reply to customer inquiries.
- **Analytics Dashboard**: 6-month order volume, revenue trends, and popular clothing categories.

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, React Router DOM v6, Redux Toolkit, Tailwind CSS, Lucide React, Axios, Framer Motion.
- **Backend**: Node.js, Express.js (MVC Architecture), MongoDB & Mongoose.
- **Authentication**: JWT (JSON Web Tokens), bcryptjs password hashing.
- **Media Handling**: Multer file uploads with dual-mode storage (Cloudinary cloud CDN or local `/uploads` fallback).
- **Security & Reliability**: Helmet, CORS, Express Rate Limiting, Input Validation, and centralized error handling middleware.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** running locally (`mongodb://127.0.0.1:27017/rk_stitches`) or MongoDB Atlas URI

### 2. Installation
Run the root helper or install each workspace:
```bash
# In the project root:
cd server && npm install
cd ../client && npm install
```

### 3. Seed Demo Data
Populate the database with realistic services, categories, designs, gallery items, videos, FAQs, and accounts:
```bash
cd server
npm run seed
```

### 4. Running Locally
Start both backend API (Port 5000) and frontend Vite server (Port 5173):
```bash
# Terminal 1 (Backend API):
cd server
npm run dev

# Terminal 2 (Frontend Client):
cd client
npm run dev
```

Visit the application at: **`http://localhost:5173`**

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Super Admin** | `admin@rkstitches.com` | `Admin@123456` |
| **Demo Customer** | `ananya@example.com` | `Customer@123456` |

*Note: The login page includes one-click demo fill buttons for quick testing.*

---

## 📱 WhatsApp Integration
Pre-configured WhatsApp CTAs are embedded across the platform:
- Direct floating button on all pages with interactive tooltip.
- Specific order inquiries with prefilled booking numbers (`#RK-26...`).
- Design inquiry prefill: *"Hello RK Stitches! I would like to inquire about [Design Name]"*.

---

## 📄 License
Crafted for **RK STITCHES**. All rights reserved.
