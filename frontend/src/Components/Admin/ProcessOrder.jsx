import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearError,
  updateOrder,
} from "../../Reducer/OrderReducer/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Layouts/Loader/Loader";
import {
  Package,
  Truck,
  CreditCard,
  MapPin,
  Phone,
  User,
  CheckCircle,
  XCircle,
  ShoppingCart,
  IndianRupee,
} from "lucide-react";
import { updateOrderReset } from "../../Reducer/OrderReducer/orderReducer";
import toast from "react-hot-toast";
import MetaData from "../Layouts/MetaData";

const ProcessOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    if (status === "") {
      toast.error("Please select a status before updating!");
      return;
    }

    dispatch(updateOrder(id, status));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Order updated successfully!");
      dispatch(updateOrderReset());
      setStatus(""); // reset dropdown after success
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <div className="flex min-h-screen bg-gray-50">
        <MetaData title={`Process Orders`} />
        <SideBar />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Process Order
              </h1>

              <div
                className={`grid gap-6 ${
                  order.orderStatus === "Delivered"
                    ? "grid-cols-1"
                    : "lg:grid-cols-3"
                }`}
              >
                {/* Order Details Section */}
                <div
                  className={`${
                    order.orderStatus === "Delivered" ? "" : "lg:col-span-2"
                  } space-y-6`}
                >
                  {/* Shipping Info */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                      Shipping Info
                    </h2>
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <div className="flex items-center text-gray-600 sm:w-32">
                          <User className="w-4 h-4 mr-2" />
                          <span className="font-medium">Name:</span>
                        </div>
                        <span className="text-gray-800 mt-1 sm:mt-0">
                          {order.user && order.user.name}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <div className="flex items-center text-gray-600 sm:w-32">
                          <Phone className="w-4 h-4 mr-2" />
                          <span className="font-medium">Phone:</span>
                        </div>
                        <span className="text-gray-800 mt-1 sm:mt-0">
                          {order.shippingInfo && order.shippingInfo.phoneNo}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start">
                        <div className="flex items-center text-gray-600 sm:w-32">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="font-medium">Address:</span>
                        </div>
                        <span className="text-gray-800 mt-1 sm:mt-0 break-words">
                          {order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                      Payment
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">
                          Status:
                        </span>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded" ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              PAID
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 mr-1" />
                              NOT PAID
                            </>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">
                          Amount:
                        </span>
                        <span className="text-gray-800 font-semibold flex items-center">
                          <IndianRupee className="w-4 h-4" />
                          {order.totalPrice && order.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Status */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Package className="w-5 h-5 mr-2 text-blue-600" />
                      Order Status
                    </h2>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">
                        Current Status:
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          order.orderStatus === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.orderStatus === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.orderStatus === "delivered" && (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        )}
                        {order.orderStatus === "shipped" && (
                          <Truck className="w-4 h-4 mr-1" />
                        )}
                        {order.orderStatus && order.orderStatus}
                      </span>
                    </div>
                  </div>

                  {/* Cart Items */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
                      Order Items
                    </h2>
                    <div className="space-y-4">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div
                            key={item.product}
                            className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-gray-50 rounded-lg"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <Link
                                to={`/product/${item.product}`}
                                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                              >
                                {item.name}
                              </Link>
                              <div className="text-sm text-gray-600 mt-1">
                                Quantity: {item.quantity}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">
                                <IndianRupee className="w-3 h-3 inline" />
                                {item.price} × {item.quantity}
                              </div>
                              <div className="font-semibold text-gray-800 flex items-center justify-end">
                                <IndianRupee className="w-4 h-4" />
                                {item.price * item.quantity}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Update Order Status Form */}
                {order.orderStatus !== "delivered" && (
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                      <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Update Order Status
                      </h2>
                      <form
                        onSubmit={updateOrderSubmitHandler}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Status
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Package className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                              onChange={(e) => setStatus(e.target.value)}
                              value={status}
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            >
                              <option value="">Choose Status</option>
                              {order.orderStatus === "processing" && (
                                <option value="shipped">Shipped</option>
                              )}
                              {order.orderStatus === "shipped" && (
                                <option value="delivered">Delivered</option>
                              )}
                            </select>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors ${
                            loading
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {loading ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              <Truck className="w-5 h-5 mr-2" />
                              Update Status
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
