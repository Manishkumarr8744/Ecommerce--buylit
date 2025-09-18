import axios from "axios";
import { addToCart, removeCartItem, saveShippingInfo } from "./cartReducer";

// ➤ Add to Cart
export const addtocart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);

  dispatch(
    addToCart({
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.image[0].url,
      stock: data.product.stock,
      quantity,
    })
  );

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// ➤ Remove from Cart
export const removetocart = (id) => async (dispatch, getState) => {
  dispatch(removeCartItem(id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// ➤ Save Shipping Info
export const saveshippingInfo = (data) => async (dispatch) => {
  dispatch(saveShippingInfo(data));
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
