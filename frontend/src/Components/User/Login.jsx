import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../Reducer/UserReducer/userAction";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layouts/MetaData";

const Login = () => {
  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error); // ✅ show error with toast
      dispatch(clearError());
    }

    if (isAuthenticated) {
      toast.success("Logged-in successfully!"); // ✅ success toast
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <div className="mt-[3rem] min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 px-4">
      <MetaData title={`Login`} />
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        {/* Logo / Title */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          BuyLit Store
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Login to your account
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-6 flex justify-around text-sm text-gray-600">
          
          <a href="/signup" className="hover:underline">
            Sign up?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
