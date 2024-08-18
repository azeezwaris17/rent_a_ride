// src/constants/errorMessages.js
const ERROR_MESSAGES = {
  AUTH: {
    UNAUTHORIZED: "Unauthorized access.",
    INVALID_CREDENTIALS: "Invalid credentials. Please try again.",
    EMAIL_ALREADY_EXISTS: "Email already exists. Please use a different email.",
  },
  VALIDATION: {
    REQUIRED_FIELD: "This field is required.",
    INVALID_EMAIL: "Please enter a valid email address.",
    PASSWORD_TOO_SHORT: "Password must be at least 6 characters long.",
  },
  BOOKINGS: {
    CAR_NOT_AVAILABLE:
      "The selected car is not available for the chosen dates.",
    BOOKING_NOT_FOUND: "Booking not found.",
  },
  GENERAL: {
    SERVER_ERROR: "An unexpected error occurred. Please try again later.",
  },
};

module.exports = ERROR_MESSAGES;
