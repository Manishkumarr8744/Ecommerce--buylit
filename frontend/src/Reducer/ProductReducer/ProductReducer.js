import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
  productsCount: 0,
  resultPerPage: 0,
  filteredProductsCount: 0,
};

const ProductReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    allProductRequest(state) {
      state.loading = true;
      state.products = [];
    },
    adminProductRequest(state) {
      state.loading = true;
      state.products = [];
    },
    allProductSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    adminProductSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    allProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    adminProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const {
  allProductRequest,
  adminProductRequest,
  allProductSuccess,
  adminProductSuccess,
  allProductFail,
  adminProductFail,
  clearErrors,
} = ProductReducer.actions;

export default ProductReducer.reducer;
