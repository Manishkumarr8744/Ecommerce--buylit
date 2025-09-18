import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, {  } from "react-hot-toast";
import {
  clearError,
  updatePassowrd,
} from "../../Reducer/UserReducer/userAction";
import { updatePasswordReset } from "../../Reducer/UserReducer/userProfleReducer";
import MetaData from "../Layouts/MetaData";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector(
    (state) => state.updateProfile
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error(" New password and confirm password do not match!");
      return;
    }

    const passwordData = { oldPassword, confirmPassword, newPassword };
    dispatch(updatePassowrd(passwordData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success(" Password changed successfully");
      navigate("/profile");
      dispatch(updatePasswordReset());
    }
  }, [isUpdated, error, dispatch, navigate]);

  return (
    <div className="mt-[3rem] flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      {/* Toaster */}
      <MetaData title={`Update Password`} />
      <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-10 w-full sm:w-[80vw] md:w-[60vw] lg:w-[40vw] max-w-3xl">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans text-gray-800 mb-8 text-center">
          Update Password
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Old Password */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-2">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your old password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transform hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
