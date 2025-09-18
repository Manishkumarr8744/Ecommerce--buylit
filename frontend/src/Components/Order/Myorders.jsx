import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getuserOrder } from "../../Reducer/OrderReducer/orderAction"; // 👉 update with your action
import { clearError } from "../../Reducer/UserReducer/userAction";
import MetaData from "../Layouts/MetaData";

const MyOrders = () => {
  const dispatch = useDispatch();

  // Access orders state from Redux
  const { orders , loading, error } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(getuserOrder()); 
    if (error) {
      console.log("Error fetching orders:", error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  return (
    <div className="mt-[3rem] min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl p-6 sm:p-10">
              <MetaData title={`My Orders`} />

        
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          My Orders
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">You have no orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 text-gray-700">{order._id}</td>
                    <td
                      className={`p-4 font-medium ${
                        order.orderStatus === "delivered"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.orderStatus}
                    </td>
                    <td className="p-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-gray-800 font-semibold">
                      ₹{order.totalPrice}
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        to={`/order/${order._id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
