import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../Reducer/CartReducer/cartReducer";
import MetaData from "../Layouts/MetaData";

const Success = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
   useEffect(() => {
    dispatch(clearCart())
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-10 text-center 
        w-full sm:w-[80vw] md:w-[60vw] lg:w-[50vw] max-w-5xl">
        <MetaData title={`Success`} />

        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-20 sm:w-24 h-20 sm:h-24 drop-shadow-lg" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
          Order Placed Successfully 🎉
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 mb-10 leading-relaxed text-base sm:text-lg">
          Your order has been placed successfully.  
          Thank you for shopping with us!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <button
            onClick={() => navigate("/products")}
            className="w-full sm:w-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:opacity-90 transform hover:scale-105 transition duration-300"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="w-full sm:w-1/2 bg-gray-100 text-gray-800 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transform hover:scale-105 transition duration-300"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
