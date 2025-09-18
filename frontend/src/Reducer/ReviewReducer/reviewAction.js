import axios from "axios";
import {
  newReviewRequest,
  newReviewSuccess,
  newReviewFail,
  newReviewReset,
  clearErrors,
} from "./reviewReducer"
import { deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,} from "./reviewReducerD"
import { allReviewFail, allReviewRequest, allReviewSuccess } from "./allReviewReducer";


//create new review
export const newReview=(reviewData)=>async(dispatch)=>{
    try{
        dispatch(newReviewRequest());
        const config = {headers: { "Content-Type": "application/json" },};
        const {data}=await axios.put(`/api/v1/review`,reviewData,config)
        dispatch(newReviewSuccess(data.success))

    }catch(err){
        console.log("error in new review action",err);
        dispatch(newReviewFail(err.response.data.message))
    }
}

//delete Review -Admin
export const deleteReviews=(id,productId)=>async(dispatch)=>{
  console.log("here ",id, productId);
  
  try{
    dispatch(deleteReviewRequest());
    const { data } = await axios.delete(`/api/v1/reviews?id=${id}&productId=${productId}` );
    console.log(data);
    
    dispatch(deleteReviewSuccess(data.success))

  }catch(err){
    console.log(err);
    
    dispatch(deleteReviewFail(err.response.data.message))
  }
}

//get all reviews
export const getAllReviews=(id)=>async(dispatch)=>{
  try{
    dispatch(allReviewRequest());
     const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
    dispatch(allReviewSuccess(data.reviews))
  }catch(err){
    dispatch(allReviewFail(err.response.data.message))
  }
}

//clear Error
export const clearError = () => async (dispatch) => {
  dispatch(clearErrors());
};

