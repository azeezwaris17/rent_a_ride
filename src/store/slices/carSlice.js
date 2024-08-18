import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (searchParams) => {
    const { carModel } = searchParams;
    console.log(carModel);
    const response = await axios.get(`/api/cars/fetchCars?model=${carModel}`);
    console.log(response.data);
    return response.data;
  }
);

const carSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    status: "idle",
    error: null,
    selectedCar: null,
  },
  reducers: {
    setSelectedCar(state, action) {
      state.selectedCar = action.payload;
    },
    clearSelectedCar(state) {
      state.selectedCar = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors
export const { setSelectedCar, clearSelectedCar } = carSlice.actions;

export const selectSelectedCar = (state) => state.car.selectedCar;

export const selectCars = (state) => state.cars.cars;
export const selectCarsStatus = (state) => state.cars.status;
export const selectCarsError = (state) => state.cars.error;

export default carSlice.reducer;
