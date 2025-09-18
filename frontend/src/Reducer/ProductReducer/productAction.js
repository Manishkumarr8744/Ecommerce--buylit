import {   allProductRequest,
  adminProductRequest,
  allProductSuccess,
  adminProductSuccess,
  allProductFail,
  adminProductFail,
  clearErrors,
} from "./ProductReducer"
import {productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
  } from "./productDetailsReducer"
import {  deleteProductRequest,
  updateProductRequest,
  deleteProductSuccess,
  updateProductSuccess,
  deleteProductFail,
  updateProductFail,
  deleteProductReset,
  updateProductReset,
  } from "./ProductReducers"

import { newProductRequest,
  newProductSuccess,
  newProductFail,} from "./newProductReducer"
import axios from "axios";


//get all products
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch(allProductRequest());

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    //   if (category) {
    //     link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    //   }

      const { data } = await axios.get(link);

      dispatch(allProductSuccess(data));
    } catch (error) {
      dispatch(allProductFail(error));
    }
  };

//get single product
export const getProductDetails=(id)=>async(dispatch)=>{
    try{
     dispatch(productDetailsRequest());
    const {data}= await axios.get(`/api/v1/products/${id}`)
    dispatch(productDetailsSuccess(data.product))
    }catch(err){
        console.log("error in getproductDtails action",err);
        dispatch(productDetailsFail(err.response.data.message))
    }
}




export const updateProduct=(id,productData)=>async(dispatch)=>{
  try{
    dispatch(updateProductRequest());
    const config = {headers: { "Content-Type": "application/json" }};
    const { data } = await axios.put(`/api/v1/admin/products/${id}`,productData,config );
    dispatch(updateProductSuccess(data))
  }catch(err){
    dispatch(updateProductFail(err.response.data.message))
  }

}


//admin products
export const getAdminProduct=()=>async(dispatch)=>{
  try{
    dispatch(adminProductRequest());
    const {data}=await axios.get(`/api/v1/admin/products`);
    dispatch(adminProductSuccess(data.products))
  }catch(err){
    dispatch(adminProductFail(err.response.data.message))
  }

}

//delete Product -Admin
export const deleteProduct=(id)=>async(dispatch)=>{
 try{
   dispatch(deleteProductRequest());
   const { data } = await axios.delete(`/api/v1/admin/products/${id}`);
   dispatch(deleteProductSuccess(data.success))
 }catch(err){
  dispatch(deleteProductFail(err.response.data.message))
 }
}

//create product -Admin
export const createProduct=(productData)=>async(dispatch)=>{
  console.log(productData);
  
  try{
    dispatch(newProductRequest());
    const config = {headers: { "Content-Type": "application/json" },};
    const { data } = await axios.post(`/api/v1/admin/products/new`,productData,config);
    dispatch(newProductSuccess(data.success))
  }catch(err){
    console.log(err);
    
    dispatch(newProductFail(err.response.data.message));
  }
}

//clear errors
export const ClearErrors=()=>async(dispatch)=>{
    dispatch(clearErrors())
}