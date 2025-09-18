import { createSlice } from "@reduxjs/toolkit";

const orderReducer = createSlice({
  name: "order",
  initialState: {
    loading: false,
    isUpdated: false,
    isDeleted: false,
    error: null,
  },
  reducers: {
    updateOrderRequest: (state) => {
      state.loading = true;
    },
    deleteOrderRequest: (state) => {
      state.loading = true;
    },

    updateOrderSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    deleteOrderSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },

    updateOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateOrderReset: (state) => {
      state.isUpdated = false;
    },
    deleteOrderReset: (state) => {
      state.isDeleted = false;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  updateOrderRequest,
  deleteOrderRequest,
  updateOrderSuccess,
  deleteOrderSuccess,
  updateOrderFail,
  deleteOrderFail,
  updateOrderReset,
  deleteOrderReset,
  clearErrors,
} = orderReducer.actions;

export default orderReducer.reducer;
