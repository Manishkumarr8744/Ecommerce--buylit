import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {},
  loading: false,
  error: null,
};

const myorderDetails = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    orderDetailsRequest: (state) => {
      state.loading = true;
    },
    orderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
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
  clearErrors,
} = myorderDetails.actions;

export default myorderDetails.reducer;
