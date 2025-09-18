import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearError } from "../../Reducer/OrderReducer/orderAction";
import axios from "axios";
import toast, {  } from "react-hot-toast";
import MetaData from "../Layouts/MetaData";

const Payment = () => {
  const dispatch = useDispatch();
  const paybtn = useRef(null);
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ number: "", expiry: "", cvc: "" });

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const handlePay = async (e) => {
    e.preventDefault();

    const cardNumber = elements?.getElement(CardNumberElement);
    const expiry = elements?.getElement(CardExpiryElement);
    const cvc = elements?.getElement(CardCvcElement);

    // Basic validation
    if (!cardNumber?._complete || !expiry?._complete || !cvc?._complete) {
      toast.error("Please complete all card details before proceeding.");
      return;
    }

    setLoading(true);
    paybtn.current.disabled = true;

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardNumber,
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        setLoading(false);
        paybtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          toast.success("Payment successful 🎉");
          navigate("/success");
        } else {
          setLoading(false);
          paybtn.current.disabled = false;
          toast.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      setLoading(false);
      paybtn.current.disabled = false;
      toast.error(error.response?.data?.message || "Payment failed");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  const handleElementChange = (event, field) => {
    if (event.error) {
      setErrors((prev) => ({ ...prev, [field]: event.error.message }));
    } else if (event.complete) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: `${field} is incomplete` }));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <MetaData title={`Payment`} />
      <form
        className="bg-white shadow-lg rounded-2xl w-[90vw] max-w-md p-6"
        onSubmit={handlePay}
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Payment Details
        </h2>

        {/* Stripe Card Number */}
        <div className="mb-2">
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg">
            <CreditCardIcon className="text-gray-500" />
            <CardNumberElement
              className="w-full p-2 focus:outline-none"
              onChange={(e) => handleElementChange(e, "number")}
            />
          </div>
          {errors.number && (
            <p className="text-red-500 text-sm mt-1">{errors.number}</p>
          )}
        </div>

        {/* Stripe Expiry */}
        <div className="mb-2">
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg">
            <EventIcon className="text-gray-500" />
            <CardExpiryElement
              className="w-full p-2 focus:outline-none"
              onChange={(e) => handleElementChange(e, "expiry")}
            />
          </div>
          {errors.expiry && (
            <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
          )}
        </div>

        {/* Stripe CVV */}
        <div className="mb-4">
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg">
            <VpnKeyIcon className="text-gray-500" />
            <CardCvcElement
              className="w-full p-2 focus:outline-none"
              onChange={(e) => handleElementChange(e, "cvc")}
            />
          </div>
          {errors.cvc && (
            <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
          )}
        </div>

        {/* Pay Button */}
        <button
          type="submit"
          ref={paybtn}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300
            ${
              loading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
          {loading
            ? "Processing..."
            : `Pay ₹${orderInfo && orderInfo.totalPrice}`}
        </button>
      </form>
    </div>
  );
};

export default Payment;
