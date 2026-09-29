# RK STITCHES - Database Schema Documentation

The RK Stitches platform uses MongoDB via Mongoose ODM. Schemas are structured with proper relationships, validation, and indexes.

---

## 1. User (`User.js`)
Stores customer profiles and studio staff accounts.
- `name`: String (Required, trimmed)
- `email`: String (Required, unique, lowercase, regex-validated)
- `phone`: String (Required)
- `password`: String (Hashed with bcrypt, `select: false`)
- `role`: Enum [`SUPER_ADMIN`, `ADMIN`, `STAFF`, `CUSTOMER`] (Default: `CUSTOMER`)
- `avatar`: String (URL)
- `addresses`: Array of Subdocuments (`street`, `landmark`, `city`, `state`, `pincode`, `isDefault`)
- `status`: Enum [`ACTIVE`, `DISABLED`]
- `googleId`: String (Optional)
- Timestamps (`createdAt`, `updatedAt`)

---

## 2. Booking (`Booking.js`)
Core custom tailoring orders and live timeline tracking.
- `bookingNumber`: String (Unique, e.g. `RK-260929-8354`)
- `user`: ObjectId (Ref: `User`, Optional for guest requests)
- `customerName`: String (Required)
- `customerPhone`: String (Required)
- `customerEmail`: String
- `clothingType`: Enum [`Blouse`, `Maggam Work Blouse`, `Lehenga / Choli`, `Long Frock`, `Kurti / Salwar`, `Langa Blouse`, `School / College Uniform`, `Western Dress`, `Kids Wear`, `Custom Design / Other`]
- `service`: ObjectId (Ref: `Service`)
- `serviceName`: String
- `savedMeasurementProfile`: ObjectId (Ref: `Measurement`)
- `measurementsSnapshot`: Object (`shoulder`, `chest`, `waist`, `hip`, `sleeveLength`, `armhole`, `blouseLength`, `frontNeckDepth`, `backNeckDepth`, `neckType`)
- `fabricStatus`: Enum [`CUSTOMER_PROVIDED`, `PURCHASE_REQUESTED`, `NEED_ASSISTANCE`]
- `fabricDetails`: String
- `color`: String
- `quantity`: Number (Default: 1)
- `requiredDate`: Date (Required)
- `status`: Enum [`PENDING`, `CONFIRMED`, `MEASUREMENTS_REQUIRED`, `IN_PROGRESS`, `READY`, `COMPLETED`, `CANCELLED`]
- `timeline`: Array of Subdocuments (`status`, `title`, `note`, `updatedBy`, `timestamp`)
- `assignedStaff`: String (Default: `Unassigned`)
- `estimatedCost`: Number (Default: 0)
- `advancePaid`: Number (Default: 0)
- `paymentStatus`: Enum [`PENDING`, `PARTIAL`, `PAID`, `REFUNDED`]
- `pickupType`: Enum [`BOUTIQUE_PICKUP`, `HOME_DELIVERY`]
- `deliveryAddress`: Subdocument (`street`, `city`, `pincode`)
- `referencePhotos`: Array of Strings (URLs)

---

## 3. Measurement (`Measurement.js`)
Customer's saved anatomical sizing profiles.
- `user`: ObjectId (Ref: `User`, Required)
- `profileTitle`: String (Required, e.g., *"Wedding Blouse Measurements"*)
- `clothingType`: String (e.g. `Blouse`, `Lehenga`, `Frock`)
- `unit`: Enum [`inches`, `cm`] (Default: `inches`)
- Sizing fields:
  - `shoulder`: Number
  - `chest`: Number
  - `waist`: Number
  - `hip`: Number
  - `sleeveLength`: Number
  - `armhole`: Number
  - `sleeveRound`: Number
  - `blouseLength`: Number
  - `dressLength`: Number
  - `frontNeckDepth`: Number
  - `backNeckDepth`: Number
  - `neckType`: String
- `customNotes`: String
- `isDefault`: Boolean

---

## 4. Service (`Service.js`)
Public service offerings and pricing tiers.
- `name`: String (Required)
- `slug`: String (Required, unique, lowercase)
- `category`: String (Required)
- `shortDescription`: String
- `description`: String
- `images`: Array of Strings
- `videoUrl`: String
- `startingPrice`: Number
- `priceRange`: String (e.g. `₹650 - ₹1,800`)
- `estimatedDays`: String (e.g. `3-4 business days`)
- `isAvailable`: Boolean (Default: `true`)
- `isFeatured`: Boolean
- `tags`: Array of Strings
- `features`: Array of Strings

---

## 5. Design (`Design.js`)
Boutique collections and inspiration lookbook.
- `title`: String (Required)
- `slug`: String (Unique)
- `category`: String
- `description`: String
- `images`: Array of Strings
- `videoUrl`: String
- `estimatedPrice`: Number
- `tags`: Array of Strings
- `fabricRecommendation`: String
- `stitchingDays`: String
- `isFeatured`: Boolean
- `likesCount`: Number (Default: 0)

---

## 6. Other Entities
- **Category**: `name`, `slug`, `description`, `image`, `iconName`, `order`, `isActive`
- **Gallery**: `title`, `category`, `imageUrl`, `caption`, `isFeatured`, `order`
- **Video**: `title`, `category`, `videoUrl`, `thumbnailUrl`, `description`, `duration`, `isPublished`
- **Wishlist**: `user` (Unique ObjectId), `designs` (Array of ObjectId refs)
- **Review**: `user`, `authorName`, `booking`, `service`, `rating`, `comment`, `isApproved`, `isFeatured`
- **Testimonial**: `clientName`, `location`, `occasion`, `rating`, `reviewText`, `avatar`, `isFeatured`
- **Notification**: `user`, `title`, `message`, `type`, `bookingId`, `isRead`, `link`
- **Message**: `name`, `email`, `phone`, `subject`, `category`, `message`, `status`, `adminReply`, `repliedAt`
- **Coupon**: `code`, `discountType`, `discountAmount`, `minOrderAmount`, `maxDiscount`, `endDate`, `usageLimit`, `timesUsed`
- **Setting**: `businessName`, `phone`, `email`, `whatsapp`, `address`, `businessHours`, `heroHeading`, `heroSubheading`
