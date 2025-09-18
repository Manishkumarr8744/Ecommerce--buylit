import axios from "axios"
import  {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  clearErrors,
} from "./neworderReducer"
import { myorderFail, myorderRequest, myorderSuccess } from "./myorderReducer";
import { allOrdersRequest,  allOrdersSuccess,allOrdersFail} from "./getAllOrdersReducer"
import { deleteOrderFail, deleteOrderRequest, deleteOrderSuccess,  updateOrderRequest,updateOrderSuccess,updateOrderFail } from "./orderReducer";
import { orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,} from "./orderDetail"


//create order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);
    dispatch(createOrderSuccess(data.success));
  } catch (error) {
    console.log("error in new order action",error);
    dispatch(createOrderFail(error.response.data.message))
  }
};


//get user oder
export const getuserOrder=()=>async(dispatch)=>{
  try{
    dispatch(myorderRequest())
    const {data}= await axios.get(`/api/v1/orders/me`);
    dispatch(myorderSuccess(data.order))
  }catch(err){
    console.log("err in order action",err);
    dispatch(myorderFail(err.response.data.message))
  }
}

//get single user order details
export const getOrderDetails=(id)=>async(dispatch)=>{
  console.log(id);
  
  try{
    dispatch(orderDetailsRequest());
    const { data } = await axios.get(`/api/v1/order/${id}`);
    console.log(data);
    
    dispatch((orderDetailsSuccess(data)))
  }catch(err){
    dispatch(orderDetailsFail(err.response.data.message))
  }
  
}

//get all orders -Admin
export const getAllOrders=()=>async(dispatch)=>{
    try {
    dispatch(allOrdersRequest());
    const { data } = await axios.get("/api/v1/admin/orders");

    dispatch(allOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(allOrdersFail(error.response.data.message));
  }
}

//delete order -Admin
export const deleteOrder=(id)=>async(dispatch)=>{
  try{
     dispatch(deleteOrderRequest());
     const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
     dispatch(deleteOrderSuccess(data.success))
  }catch(err){
    dispatch(deleteOrderFail(err.response.data.message))
  }
}

//update order -Admin
export const updateOrder=(id,status)=>async(dispatch)=>{
  console.log(id,status);
  
  try{
    dispatch(updateOrderRequest());
    const config = {headers: {"Content-Type": "application/json",} };
     const { data } = await axios.put(`/api/v1/admin/order/${id}`,{status},config);
     
     dispatch(updateOrderSuccess(data.success))

  }catch(err){
    console.log(err);
    
    dispatch(updateOrderFail(err.response.data.message))

  }
}


//clear errros
export const clearError = () => async (dispatch) => {
  dispatch(clearErrors());
};