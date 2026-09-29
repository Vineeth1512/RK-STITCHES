# RK STITCHES - Local Setup & Installation Guide

This guide walks you through setting up and running the RK Stitches MERN platform on your local machine.

---

## 1. System Requirements
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Community Server (v6.0+) running locally or a MongoDB Atlas cloud cluster

---

## 2. Directory Structure
```
RK_STETCHES/
├── client/              # Vite React Frontend
│   ├── src/
│   │   ├── components/  # Common, layout, and UI components
│   │   ├── pages/       # Public, customer, and admin pages
│   │   ├── store/       # Redux Toolkit slices
│   │   ├── services/    # Axios API client
│   │   └── styles/      # Tailwind directives & patterns
│   └── package.json
├── server/              # Express Backend REST API
│   ├── config/          # DB & Cloudinary configuration
│   ├── constants/       # Roles and status mappings
│   ├── controllers/     # MVC controller functions
│   ├── middlewares/     # JWT Auth, error handler, Multer uploads
│   ├── models/          # Mongoose data schemas
│   ├── routes/          # Express route definitions
│   ├── scripts/         # Database seed script
│   └── server.js        # Server entrypoint
├── package.json         # Root orchestrator scripts
└── README.md
```

---

## 3. Environment Configuration

### Backend Environment (`server/.env`)
Create or verify `server/.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/rk_stitches
JWT_SECRET=rk_stitches_super_secure_jwt_secret_key_2026_modern_fashion
JWT_EXPIRES_IN=7d

# Optional Cloudinary Media Storage (Local storage fallback is active if empty)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Boutique Contact Information
BUSINESS_NAME=RK STITCHES
BUSINESS_PHONE=+919876543210
BUSINESS_WHATSAPP=+919876543210
BUSINESS_EMAIL=contact@rkstitches.com
```

---

## 4. Install Dependencies

From root:
```bash
# Install Server packages
cd server
npm install

# Install Client packages
cd ../client
npm install
```

---

## 5. Seed the Database
Populate your database with categories, tailoring services, fashion collections, masonry lookbook photos, sample video showcases, testimonials, FAQs, and accounts:
```bash
cd server
npm run seed
```
Output:
```
Connected to MongoDB. Beginning data seeding...
Users created:
  Admin:    admin@rkstitches.com / Admin@123456
  Customer: ananya@example.com / Customer@123456
✅ Seed data created successfully!
```

---

## 6. Run the Application

Start the Express backend:
```bash
cd server
npm run dev
```
*API will start listening at: `http://localhost:5000`*

In a separate terminal, start the React frontend:
```bash
cd client
npm run dev
```
*Frontend will be live at: `http://localhost:5173`*

Open your browser to `http://localhost:5173` to explore the website.
