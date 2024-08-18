// src/store/slices/admin/auth/adminAuthSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerAdmin = createAsyncThunk(
  "admin/registerAdmin",
  async (adminData, thunkAPI) => {
    try {
      const response = await axios.post("/api/admin/auth/register", adminData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (adminData, thunkAPI) => {
    try {
      const response = await axios.post("/api/admin/auth/login", adminData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetAdminPassword = createAsyncThunk(
  "admin/resetAdminPassword",
  async (resetData, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/admin/auth/reset-password",
        resetData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: { admin: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetAdminPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetAdminPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resetAdminPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { logout } = adminAuthSlice.actions;
export const selectAdmin = (state) => state.adminAuth.admin;
export const selectAdminRole = (state) => state.adminAuth.admin?.role;
export default adminAuthSlice.reducer;
