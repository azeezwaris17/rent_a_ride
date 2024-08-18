// src/models/car.js
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  pricePerHour: Number,
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  availability: {
    type: Boolean,
    default: true,
  },
  images: [String],
  status: {
    type: String,
    enum: ["available", "booked", "unavailable"],
    default: "available",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Car", carSchema);
