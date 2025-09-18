import { createSlice } from "@reduxjs/toolkit";

const initialState={    
  isUpdated: false,
  isDeleted: false,
  message: null,
  loading: false,
  error: null,
}

const userProfileReducer= createSlice({
    name:"userProfile",
    initialState,
    reducers:{
        updateUserRequest(state){
            state.loading=true;
        },
        updateUserSuccess(state){
            state.loading=false;
            state.isUpdated=true;
        },
        updateUserFail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        updateUserReset(state){
            state.isUpdated=false;
        },
        updatePasswordRequest(state){
            state.loading=true;
        },
        updatePasswordSuccess(state,action){
            state.loading=false;
            state.isUpdated=action.payload;
        },
        updatePasswordFail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        updatePasswordReset(state){
            state.loading=false;
            state.isUpdated=false;
        },
         deleteUserRequest(state) {
      state.loading = true;
    },
    deleteUserSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload.success;
      state.message = action.payload.message;
    },
    deleteUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserReset(state) {
      state.isDeleted = false;
    }

    }
})

export const {updatePasswordFail,updatePasswordRequest,updatePasswordSuccess,updatePasswordReset,updateUserFail,updateUserRequest,updateUserSuccess,updateUserReset, deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  deleteUserReset,}=userProfileReducer.actions;
export default userProfileReducer.reducer;