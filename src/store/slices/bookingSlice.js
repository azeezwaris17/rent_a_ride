// src/store/slices/bookingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create new booking for a user
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData) => {
    const response = await axios.post("/api/bookings", bookingData);
    return response.data;
  }
);

// Async thunk to fetch booking by ID
export const fetchBookingById = createAsyncThunk(
  "bookings/fetchBookingById",
  async (bookingId) => {
    const response = await axios.get(`/api/bookings/${bookingId}`);
    return response.data;
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    error: null,
    bookings: [],
    booking: null,
    selectedCar: null,
  },
  reducers: {
    // Add any synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors to get the state
export const selectAllBookings = (state) => state.booking.bookings;
export const selectBookingLoading = (state) => state.booking.loading;
export const selectBookingError = (state) => state.booking.error;
export const selectCurrentBooking = (state) => state.booking.booking;
export const selectBookingStatus = (state) =>
  state.booking.booking?.BookingStatus; // Adjusted selector

export default bookingSlice.reducer;
