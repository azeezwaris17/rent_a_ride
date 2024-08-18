// src/constants/notification.js
const NOTIFICATION_MESSAGES = {
  AUTH: {
    REGISTRATION_SUCCESS: "Registration successful. Please log in.",
    REGISTRATION_FAILED: "Registration failed",
    LOGIN_SUCCESS: "Login successful.",
    LOGIN_FAILED: "Login failed",
  },
  BOOKINGS: {
    BOOKING_CONFIRMED: "Booking confirmed successfully.",
    BOOKING_CANCELLED: "Booking cancelled successfully.",
  },

  CARS: {
    FETCH_CARS_FAILED: "Failed to fetch cars",
  },
  GENERAL: {
    OPERATION_SUCCESS: "Operation completed successfully.",
  },

};

const NOTIFICATION_TYPES = {
  BOOKING: "booking",
  PROMOTION: "promotion",
  REMINDER: "reminder",
};

module.exports = {
  NOTIFICATION_MESSAGES,
  NOTIFICATION_TYPES,
};
