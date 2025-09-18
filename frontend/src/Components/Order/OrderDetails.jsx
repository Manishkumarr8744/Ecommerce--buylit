import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, clearError } from "../../Reducer/OrderReducer/orderAction";
import Loader from "../Layouts/Loader/Loader";
// import { useAlert } from "react-alert";
import { 
  Package, 
  Truck, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  User, 
  Phone, 
  MapPin,
  ShoppingBag,
  Hash
} from "lucide-react";
import MetaData from "../Layouts/MetaData";

const OrderDetails = () => {
    const dispatch = useDispatch();
    const {id}=useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  // const alert = useAlert();

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearError());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch,  error,id]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
      case "succeeded":
      case "paid":
        return "text-green-600 bg-green-100";
      case "processing":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-red-600 bg-red-100";
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="mt-[3rem] min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Order Header */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center space-x-2 text-gray-900">
                  <Hash className="w-5 h-5" />
                  <h1 className="text-2xl font-bold">
                    Order {order && order._id}
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Order Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Shipping Info */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Truck className="w-5 h-5 text-gray-600" />
                      <h2 className="text-lg font-semibold text-gray-900">
                        Shipping Information
                      </h2>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <User className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium text-gray-900">
                            {order.user && order.user.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Phone className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium text-gray-900">
                            {order.shippingInfo && order.shippingInfo.phoneNo}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium text-gray-900">
                            {order.shippingInfo &&
                              `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <ShoppingBag className="w-5 h-5 text-gray-600" />
                      <h2 className="text-lg font-semibold text-gray-900">
                        Order Items
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div
                            key={item.product}
                            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <Link
                                to={`/product/${item.product}`}
                                className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                              >
                                {item.name}
                              </Link>
                              <div className="mt-1 text-sm text-gray-500">
                                Quantity: {item.quantity} × ₹{item.price}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-900">
                                ₹{item.price * item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Payment & Status */}
                <div className="space-y-6">
                  {/* Payment Info */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <h2 className="text-lg font-semibold text-gray-900">
                        Payment Information
                      </h2>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Status</span>
                        <div className="flex items-center space-x-2">
                          {order.paymentInfo?.status === "succeeded" ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.paymentInfo?.status === "succeeded"
                                ? "text-green-600 bg-green-100"
                                : "text-red-600 bg-red-100"
                            }`}
                          >
                            {order.paymentInfo?.status === "succeeded"
                              ? "PAID"
                              : "NOT PAID"}
                          </span>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Total Amount</span>
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{order.totalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Status */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Package className="w-5 h-5 text-gray-600" />
                      <h2 className="text-lg font-semibold text-gray-900">
                        Order Status
                      </h2>
                    </div>
                    <div className="flex items-center justify-center">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;