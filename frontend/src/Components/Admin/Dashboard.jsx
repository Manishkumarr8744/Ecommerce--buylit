import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../Reducer/ProductReducer/productAction.js";
import { getAllOrders } from "../../Reducer/OrderReducer/orderAction.js";
import { getAllUsers } from "../../Reducer/UserReducer/userAction.js";
// import MetaData from "../layout/MetaData";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import MetaData from "../Layouts/MetaData.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalAmount.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600",
      link: null,
    },
    {
      title: "Total Products",
      value: products?.length || 0,
      icon: Package,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      link: "/admin/products",
    },
    {
      title: "Total Orders",
      value: orders?.length || 0,
      icon: ShoppingCart,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
      link: "/admin/orders",
    },
    {
      title: "Total Users",
      value: users?.length || 0,
      icon: Users,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600",
      link: "/admin/users",
    },
  ];

  return (
    <div className=" mt-[3rem] flex min-h-screen bg-gray-50">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="flex-1 md:ml-0">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-6 md:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store.</p>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <TrendingUp size={16} />
              <span>Last updated: {new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return stat.link ? (
                <Link
                  key={index}
                  to={stat.link}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.lightColor} p-3 rounded-lg`}>
                      <Icon size={24} className={stat.textColor} />
                    </div>
                    <ArrowUpRight size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </Link>
              ) : (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.lightColor} p-3 rounded-lg`}>
                      <Icon size={24} className={stat.textColor} />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Stock Alert */}
          {outOfStock > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-center space-x-3">
              <AlertCircle className="text-red-600" size={20} />
              <div className="flex-1">
                <h4 className="font-medium text-red-800">Stock Alert</h4>
                <p className="text-sm text-red-600">
                  {outOfStock} product{outOfStock > 1 ? 's are' : ' is'} currently out of stock
                </p>
              </div>
              <Link
                to="/admin/products"
                className="text-sm font-medium text-red-600 hover:text-red-700 underline"
              >
                View Products
              </Link>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/admin/product"
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Package className="text-gray-600" size={20} />
                <span className="font-medium text-gray-700">Add New Product</span>
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ShoppingCart className="text-gray-600" size={20} />
                <span className="font-medium text-gray-700">View All Orders</span>
              </Link>
              <Link
                to="/admin/users"
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Users className="text-gray-600" size={20} />
                <span className="font-medium text-gray-700">Manage Users</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;