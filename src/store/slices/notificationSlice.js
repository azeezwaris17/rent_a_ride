// src/store/slices/notificationsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {},
  reducers: {
    showSuccessNotification: (state, action) => {
      // Implementation for showing success notification
    },
    showErrorNotification: (state, action) => {
      // Implementation for showing error notification
    },
  },
});

export const { showSuccessNotification, showErrorNotification } =
  notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
