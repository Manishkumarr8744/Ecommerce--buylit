import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

const userDetails = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    userDetailsRequest(state) {
      state.loading = true;
    },
    userDetailsSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    userDetailsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  clearError
} = userDetails.actions;

export default userDetails.reducer;
