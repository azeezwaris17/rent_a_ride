// src/store/slices/paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to process payment
export const processPayment = createAsyncThunk(
  "payments/processPayment",
  async (paymentData) => {
    const response = await axios.post("/api/payments", paymentData);
    return response.data;
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentStatus: null,
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Add any synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload;
         state.transactions.push(action.payload);
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors to get the state
export const selectPaymentStatus = (state) => state.payment.paymentStatus;
export const selectPaymentLoading = (state) => state.payment.loading;
export const selectPaymentError = (state) => state.payment.error;
export const selectAllTransactions = (state) => state.payments.transactions;

export default paymentSlice.reducer;
