import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removetocart, addtocart } from "../../Reducer/CartReducer/cartAction";
import toast from "react-hot-toast";
import MetaData from "../Layouts/MetaData";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      toast.error("⚠️ Stock limit reached");
      return;
    }
    dispatch(addtocart(id, newQty));
    toast.success("Quantity increased");
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      toast.error("⚠️ Minimum quantity is 1");
      return;
    }
    dispatch(addtocart(id, newQty));
    toast.success("Quantity decreased");
  };

  const removeCartItemHandler = (id) => {
    dispatch(removetocart(id));
    toast.success("Item removed from cart");
  };

  // 🧮 Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const tax = subtotal * 0.18; // 18% GST
  const shippingCharges = subtotal > 2000 ? 0 : 100; // Free shipping if >2000
  const totalPrice = subtotal + tax + shippingCharges;

  const checkoutHandler = () => {
    const data = { subtotal, tax, shippingCharges, totalPrice };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    toast('Proceed to Checkout', {
  icon: '🛒',
});
    navigate("/shipping");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-8">
      <MetaData title={`Cart`} />

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800 text-center tracking-tight">
          🛒 Your Cart
        </h2>

        {cartItems && cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="flex flex-col sm:flex-row items-center sm:items-start justify-between border border-gray-200 bg-gray-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-contain rounded-lg bg-white p-2 shadow"
                  />

                  <div className="flex-1 sm:ml-6 text-center sm:text-left">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600 mt-1">₹{item.price}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center sm:justify-start mt-3 space-x-4">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.product, item.quantity)
                        }
                        className="px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          increaseQuantity(item.product, item.quantity, item.stock)
                        }
                        className="px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>

                    <p className="mt-3 text-gray-700 font-bold">
                      Total: ₹{item.price * item.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() => removeCartItemHandler(item.product)}
                    className="mt-4 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 shadow-md transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md sticky top-20 h-fit">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Order Summary
              </h3>
              <p className="flex justify-between text-lg mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </p>
              <p className="flex justify-between text-lg mb-2">
                <span>GST (18%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-gray-500 mb-6">
                <span>Shipping</span>
                <span className="italic">
                  {shippingCharges === 0 ? "Free" : `₹${shippingCharges}`}
                </span>
              </p>
              <hr className="my-4" />
              <h3 className="flex justify-between text-xl font-extrabold text-gray-900 mb-6">
                <span>Grand Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </h3>
              <button
                onClick={checkoutHandler}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-md"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
