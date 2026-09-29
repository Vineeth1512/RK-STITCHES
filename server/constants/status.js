export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  MEASUREMENTS_REQUIRED: 'MEASUREMENTS_REQUIRED',
  IN_PROGRESS: 'IN_PROGRESS',
  READY: 'READY',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export const BOOKING_STATUS_LIST = Object.values(BOOKING_STATUS);

export const TRACKING_STEPS = [
  { key: 'PENDING', label: 'Booking Created', description: 'Your stitching request has been submitted.' },
  { key: 'CONFIRMED', label: 'Booking Confirmed', description: 'Our master tailor has confirmed your request.' },
  { key: 'MEASUREMENTS_REQUIRED', label: 'Measurements Needed', description: 'Please provide or update your measurements.' },
  { key: 'IN_PROGRESS', label: 'Stitching Started', description: 'Fabric cutting and stitching is in progress.' },
  { key: 'READY', label: 'Ready for Fitting/Delivery', description: 'Quality inspection passed. Ready for you!' },
  { key: 'COMPLETED', label: 'Delivered & Complete', description: 'Outfit delivered and successfully completed.' }
];
