import { createSlice } from "@reduxjs/toolkit";

const initialState={
    orders:[],
    loading:false,
    error:null
}

const myorderReducer=createSlice({
    name:"myorder",
    initialState,
    reducers:{
        myorderRequest(state){
            state.loading=true;
        },
         myorderSuccess(state,action){
            state.loading=false;
            state.orders=action.payload;
        },
         myorderFail(state,action){
            state.error=action.payload;
            state.loading=false;
        },
         
        
    }
})

export const {myorderFail,myorderRequest,myorderSuccess} =myorderReducer.actions;

export default myorderReducer.reducer;