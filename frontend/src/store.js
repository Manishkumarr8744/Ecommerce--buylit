// store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Reducer/ProductReducer/ProductReducer";
import productsReducers from "./Reducer/ProductReducer/ProductReducers";
import productDetailsReducer from "./Reducer/ProductReducer/productDetailsReducer"
import userReducer from "./Reducer/UserReducer/userReducer"
import reviewReducer from "./Reducer/ReviewReducer/reviewReducer"
import cartReducer from "./Reducer/CartReducer/cartReducer"
import neworderReducer from "./Reducer/OrderReducer/neworderReducer"
import userProfileReducer from "./Reducer/UserReducer/userProfleReducer"
import myorderReducer from "./Reducer/OrderReducer/myorderReducer"
import myorderDetails from "./Reducer/OrderReducer/myorderDetails"
import allUserReducer from "./Reducer/UserReducer/allUserReducer"
import getAllOrdersReducer from "./Reducer/OrderReducer/getAllOrdersReducer"
import orderReducer from "./Reducer/OrderReducer/orderReducer"
import reviewReducerD from "./Reducer/ReviewReducer/reviewReducerD"
import allReviewReducer from "./Reducer/ReviewReducer/allReviewReducer"
import newProductReducer from "./Reducer/ProductReducer/newProductReducer"
import userDetails from "./Reducer/UserReducer/userDetails"
import orderDetail from "./Reducer/OrderReducer/orderDetail"
import productReducers from "./Reducer/ProductReducer/ProductReducers"

const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducers,
    productDetails:productDetailsReducer,
    user:userReducer,
    newReview:reviewReducer,
    cart:cartReducer,
    newOrder:neworderReducer,
    updateProfile:userProfileReducer,
    myOrders:myorderReducer,
    myOrderDetail:myorderDetails,
    allUsers:allUserReducer,
    allOrders:getAllOrdersReducer,
    orderDetails:orderDetail,
    order:orderReducer,
    reviewReducerD:reviewReducerD,
    allReviews:allReviewReducer,
    newProduct:newProductReducer,
    userDetails:userDetails


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
