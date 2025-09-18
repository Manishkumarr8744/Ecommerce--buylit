import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Home from "./Components/Home/Home"
import Header from './Components/Layouts/Header/Header';
import Footer from './Components/Layouts/Footer/Footer';
import ProductDetails from './Components/Product/ProductDetails';
import Login from './Components/User/Login';
import Signup from './Components/User/SignUp';
import Cart from './Components/Cart/cart';
import Product from './Components/Product/Products';
import Shipping from './Components/Cart/Shipping';
import About from './Components/Layouts/About/About';
import Search from './Components/Product/Search';
import Dashboard from './Components/Admin/Dashboard';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Toaster } from "react-hot-toast";
import { loadUser } from './Reducer/UserReducer/userAction';
import Payment from './Components/Cart/Payment';
import Success from './Components/Cart/Success';
import Profile from './Components/User/Profile';
import UpdateProfile from './Components/User/UpdateProfile';
import UpdatePassword from './Components/User/UpdatePassword';
import MyOrders from './Components/Order/Myorders';
import ProductList from './Components/Admin/ProductList';
import OrderList from './Components/Admin/OrderList';
import UserList from './Components/Admin/UserList';
import ProductReviews from './Components/Admin/ProductReviews';
import CreateProduct from './Components/Admin/CreateProduct';
import UpdateUser from './Components/Admin/UpdateUser';
import ProcessOrder from './Components/Admin/ProcessOrder';
import OrderDetails from './Components/Order/orderDetails';
import UpdateProduct from './Components/Admin/UpdateProduct';
import NotFound from './Components/Admin/NotFound';

const App = () => {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    dispatch(loadUser());
    getStripeApiKey();
  }, [dispatch]);

  // ⚡ loadStripe only when apiKey exists
  const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;

  return (
    <Router>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Header />
      <Routes>

        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products' element={<Product />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/success' element={<Success />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/update' element={<UpdateProfile />} />
        <Route path='/password/update' element={<UpdatePassword />} />
        <Route path='/orders' element={<MyOrders />} />
        <Route path='/order/:id' element={<OrderDetails />} />

        {/* Stripe Payment Route */}
        {stripePromise && (
          <Route
            path='/process/payment'
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
        )}

        {/* Admin Routes */}
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/products' element={<ProductList />} />
        <Route path='/admin/product/:id' element={<UpdateProduct />} />
        <Route path='/admin/orders' element={<OrderList />} />
        <Route path='/admin/users' element={<UserList />} />
        <Route path='/admin/reviews' element={<ProductReviews />} />
        <Route path='/admin/product' element={<CreateProduct />} />
        <Route path='/admin/user/:id' element={<UpdateUser />} />
        <Route path='/admin/order/:id' element={<ProcessOrder />} />



        <Route path='*' element={<NotFound />} />



      </Routes>
      <Footer />
    </Router>
  )
}

export default App
