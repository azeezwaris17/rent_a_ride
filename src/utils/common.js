const { v4: uuidv4 } = require("uuid");

// Generate a unique identifier
const generateUUID = () => {
  return uuidv4();
};

// Sleep function for delays
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

module.exports = {
  generateUUID,
  sleep,
};
