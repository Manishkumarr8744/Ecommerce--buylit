import {
  loginRequest,
  loginSuccess,
  loginFail,
  registerUserRequest,
  registerUserSuccess,
  registerUserFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  clearErrors,
} from "./userReducer"
import {updateUserFail,updateUserRequest,updateUserSuccess,updateUserReset, updatePasswordRequest, updatePasswordSuccess, updatePasswordFail, deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  deleteUserReset,} from "./userProfleReducer"
import {  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  } from "./userDetails"
import {  allUsersRequest,
  allUsersSuccess,
  allUsersFail,
  } from "./allUserReducer"
import axios from "axios"

//get user
export const login=(email, password)=>async(dispatch)=>{
    try{
        dispatch(loginRequest())
        const {data}=await axios.post(`/api/v1/login`,{email, password});
        dispatch(loginSuccess(data.user))

    }catch(err){
        console.log("error in get user action",err);
        dispatch(loginFail(err))
        
    }
}

//logout user 
export const logout=()=>async(dispatch)=>{
    try{
        await axios.get(`/api/v1/logout`)
        dispatch(logoutSuccess())
    }catch(err){
        console.log("error in logout",err);
        dispatch(logoutFail())
    }
}

//load user
export const loadUser=()=>async (dispatch)=>{
    try{
        dispatch(loadUserRequest());
        const {data}= await axios.get(`/api/v1/me`);
        dispatch(loadUserSuccess(data.user));
    }catch(err){
        console.log("error in load user action",err);
        dispatch(loadUserFail());
    }
}

//register user
export const registerUser=(userData)=>async(dispatch)=>{
    console.log(userData);
    
    try{
        dispatch(registerUserRequest())
        const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // if your backend uses cookies (JWT/session)
    };
        const {data}=await axios.post(`/api/v1/register`,userData,config); 
        dispatch(registerUserSuccess(data.user))

    }catch(err){
        console.log("errror in register User",err);
        dispatch(registerUserFail())
    }
}

//update user name and email
export const updateUser=(updatedData)=>async(dispatch)=>{
    try{
        dispatch(updateUserRequest());
        const {data}= await axios.put(`/api/v1/me/update`,updatedData)

        dispatch(updateUserSuccess(data.success))

    }catch(err){
        console.log("error in updateUser action");
        dispatch(updateUserFail(err.response.data.message))
    }

}

//update user password
export const updatePassowrd=(userData)=>async(dispatch)=>{
    try{
        dispatch(updatePasswordRequest());
        const {data}= await axios.put(`/api/v1/password/update`,userData);
        dispatch(updatePasswordSuccess(data.success))
    }catch(err){
        console.log("err in update password action",err);
        dispatch(updatePasswordFail(err.response.data.message))
    }
}

//delete user -Admin
export const deleteUser=(id)=>async(dispatch)=>{
    try{
        dispatch(deleteUserRequest());
       const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
       dispatch(deleteUserSuccess(data))

    }catch(err){
        dispatch(deleteUserFail(err.response.data.message))

    }
}


//get all users-Admin
export const getAllUsers=()=>async(dispatch)=>{
     try {
    dispatch(allUsersRequest());
    const { data } = await axios.get(`/api/v1/admin/users`);
    dispatch(allUsersSuccess(data.users) );
  } catch (error) {
    dispatch(allUsersFail(error.response.data.message));
  }
}

//get user details - Admin
export const getUserDetails=(id)=>async(dispatch)=>{
    try{
        dispatch(userDetailsRequest());
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch(userDetailsSuccess(data.user));
    }catch(err){
        dispatch(userDetailsFail(err.response.data.message));
    }
}


//update user role
export const updateUserRole=(id,userData)=>async(dispatch)=>{
    try{
        dispatch(updateUserRequest());
         const config = { headers: { "Content-Type": "application/json" } };
         const { data } = await axios.put(`/api/v1/admin/user/${id}`,userData,config);
         dispatch(updateUserSuccess(data.success))
    }catch(err){
        dispatch(updatePasswordFail(err.response.data.message))
    }

}

// Clearing Errors
export const clearError = () => async (dispatch) => {
  dispatch(clearErrors());
};