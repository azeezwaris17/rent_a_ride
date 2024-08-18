// src/constants/common.js
// User Roles
const ROLES = {
  USER: "user",
  ADMIN: "admin",
};

// Booking Status
const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
};

// Car Transmission Types
const TRANSMISSION = {
  MANUAL: "manual",
  AUTOMATIC: "automatic",
};

// Car Fuel Types
const FUEL_TYPE = {
  PETROL: "petrol",
  DIESEL: "diesel",
  ELECTRIC: "electric",
  HYBRID: "hybrid",
};

// Default Images
const DEFAULT_IMAGES = {
  CAR: "path/to/default/car/image.jpg",
  USER: "path/to/default/user/avatar.jpg",
};

module.exports = {
  ROLES,
  BOOKING_STATUS,
  TRANSMISSION,
  FUEL_TYPE,
  DEFAULT_IMAGES,
};
