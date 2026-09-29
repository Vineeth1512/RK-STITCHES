# RK STITCHES - API Documentation

The RK Stitches REST API is built on Express.js following MVC principles with JSON responses, Bearer JWT authentication, and centralized error handling.

Base URL: `http://localhost:5000/api`

---

## Standard Response Format

### Success Response:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error description message",
  "errors": []
}
```

---

## 1. Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new customer account (`name`, `email`, `phone`, `password`) |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token (`email`, `password`) |
| `POST` | `/api/auth/google` | Public | Optional Google OAuth login (`email`, `name`, `avatar`, `googleId`) |
| `GET` | `/api/auth/me` | Authenticated | Get current logged-in user profile & default addresses |
| `PATCH` | `/api/auth/profile` | Authenticated | Update user name, phone, or address array |
| `PATCH` | `/api/auth/change-password` | Authenticated | Change password (`currentPassword`, `newPassword`) |

---

## 2. Services Endpoints (`/api/services`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/services` | Public | List all services (Query filters: `category`, `search`, `featured`, `sort`) |
| `GET` | `/api/services/:slug` | Public | Get single service detail by URL slug |
| `POST` | `/api/services` | Admin / Staff | Create a new tailoring service |
| `PUT` | `/api/services/:id` | Admin / Staff | Update service specifications |
| `DELETE` | `/api/services/:id` | Admin | Delete a tailoring service |

---

## 3. Custom Stitching Bookings (`/api/bookings`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/bookings` | Public / Customer | Submit a new custom stitching order |
| `GET` | `/api/bookings/my` | Authenticated | Get current customer's order history |
| `GET` | `/api/bookings/:id` | Owner / Staff | Get full booking details with timeline |
| `POST` | `/api/bookings/:id/cancel` | Owner | Cancel a pending stitching booking |
| `GET` | `/api/bookings` | Admin / Staff | Get all bookings with pagination & status filters |
| `PATCH` | `/api/bookings/:id/status` | Admin / Staff | Update milestone status, add notes, assign tailor |

---

## 4. Measurement Profiles (`/api/measurements`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/measurements/my` | Authenticated | Get all saved measurement profiles for current user |
| `POST` | `/api/measurements` | Authenticated | Create a new named measurement profile |
| `PUT` | `/api/measurements/:id` | Authenticated | Update existing measurement profile |
| `DELETE` | `/api/measurements/:id` | Authenticated | Delete a measurement profile |
| `GET` | `/api/measurements/user/:userId` | Admin / Staff | View measurements for a specific customer |

---

## 5. Fashion Designs / Lookbook (`/api/designs`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/designs` | Public | List designs (Filters: `category`, `search`, `featured`, `page`, `limit`) |
| `GET` | `/api/designs/:slug` | Public | Get design details by slug |
| `POST` | `/api/designs/:id/like` | Public | Increment likes count for a design |
| `POST` | `/api/designs` | Admin | Add new design to collections |
| `PUT` | `/api/designs/:id` | Admin | Update design |
| `DELETE` | `/api/designs/:id` | Admin | Delete design |

---

## 6. Wishlist (`/api/wishlist`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/wishlist` | Authenticated | Retrieve customer's saved designs |
| `POST` | `/api/wishlist/add` | Authenticated | Add a design ID to wishlist |
| `DELETE` | `/api/wishlist/:designId` | Authenticated | Remove design from wishlist |

---

## 7. Media Gallery & Videos (`/api/gallery`, `/api/videos`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/gallery` | Public | List lookbook masonry photos (Filter by `category`) |
| `POST` | `/api/gallery` | Admin | Add photo to lookbook |
| `DELETE` | `/api/gallery/:id` | Admin | Delete photo |
| `GET` | `/api/videos` | Public | List showcase videos (Filter by `category`) |
| `POST` | `/api/videos` | Admin | Publish a showcase video |
| `DELETE` | `/api/videos/:id` | Admin | Delete video |

---

## 8. Reviews & Testimonials (`/api/reviews`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/reviews` | Public | List approved reviews and featured testimonials |
| `POST` | `/api/reviews` | Authenticated | Submit an order review (pending moderation) |
| `GET` | `/api/reviews/admin` | Admin | Get all reviews for moderation |
| `PATCH` | `/api/reviews/:id/moderate` | Admin | Approve or feature a review |
| `DELETE` | `/api/reviews/:id` | Admin | Delete a review |

---

## 9. Coupons & Discounts (`/api/coupons`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/coupons/validate` | Public | Validate coupon code & return calculated discount |
| `GET` | `/api/coupons` | Admin | List all promotional coupons |
| `POST` | `/api/coupons` | Admin | Create a new promo coupon |
| `PUT` | `/api/coupons/:id` | Admin | Update coupon properties |
| `DELETE` | `/api/coupons/:id` | Admin | Delete coupon |

---

## 10. Analytics & Settings (`/api/analytics`, `/api/settings`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/analytics/dashboard` | Admin / Staff | Get KPI cards, revenue metrics, monthly charts data |
| `GET` | `/api/settings` | Public | Get boutique contact information and business hours |
| `PUT` | `/api/settings` | Admin | Update business settings and hero copy |
