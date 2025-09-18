import { createSlice } from "@reduxjs/toolkit";
const initialState={
loading: false,
    isDeleted: false,
    isUpdated: false,
    error: null
}

const ProductReducers = createSlice({
  name: "product",
  initialState,
  reducers: {
    deleteProductRequest: (state) => {
      state.loading = true;
    },
    updateProductRequest: (state) => {
      state.loading = true;
    },

    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    },

    deleteProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteProductReset: (state) => {
      state.isDeleted = false;
    },
    updateProductReset: (state) => {
      state.isUpdated = false;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  deleteProductRequest,
  updateProductRequest,
  deleteProductSuccess,
  updateProductSuccess,
  deleteProductFail,
  updateProductFail,
  deleteProductReset,
  updateProductReset,
  clearErrors,
} = ProductReducers.actions;

export default ProductReducers.reducer;
