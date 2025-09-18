import { createSlice } from "@reduxjs/toolkit";

const getAllOrdersReducer = createSlice({
  name: "allOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    allOrdersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    allOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    allOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  allOrdersRequest,
  allOrdersSuccess,
  allOrdersFail,
  clearError,
} = getAllOrdersReducer.actions;

export default getAllOrdersReducer.reducer;
