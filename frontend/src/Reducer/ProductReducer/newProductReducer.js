import { createSlice } from "@reduxjs/toolkit";
import { TruckElectricIcon } from "lucide-react";

const initialState = {
  product: {},
  loading: false,
  success: false,
  error: null,
};

const newProductReducer = createSlice({
  name: "newProduct",
  initialState,
  reducers: {
    newProductRequest(state) {
      state.loading = true;
    },
    newProductSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.product = action.payload.product;
    },
    newProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    newProductReset(state) {
      state.success = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  newProductRequest,
  newProductSuccess,
  newProductFail,
  newProductReset,
  clearError,
} = newProductReducer.actions;

export default newProductReducer.reducer;
