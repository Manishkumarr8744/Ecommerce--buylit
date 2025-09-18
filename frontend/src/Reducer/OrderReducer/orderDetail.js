// src/reducers/orderDetailsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderDetail = createSlice({
  name: "orderDetails",
  initialState: {
    order: {},
    loading: false,
    error: null,
  },
  reducers: {
    orderDetailsRequest: (state) => {
      state.loading = true;
    },
    orderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload.order;
    },
    orderDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
  
} = orderDetail.actions;

export default orderDetail.reducer;
