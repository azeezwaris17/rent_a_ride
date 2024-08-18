import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./slices/user/auth/userAuthSlice";
import adminAuthReducer from "./slices/admin/auth/adminAuthSlice";
import carReducer from "./slices/carSlice";
import bookingReducer from "./slices/bookingSlice";
import paymentReducer from "./slices/paymentSlice";

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    adminAuth: adminAuthReducer,
    cars: carReducer,
    booking: bookingReducer,
    payment: paymentReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export default store;
