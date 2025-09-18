import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layouts/Loader/Loader";
import {
  clearError,
  loadUser,
  updateUser,
} from "../../Reducer/UserReducer/userAction";
import { updateUserReset } from "../../Reducer/UserReducer/userProfleReducer";
import { useNavigate } from "react-router-dom";
import toast, { } from "react-hot-toast";
import MetaData from "../Layouts/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);
  const { isUpdated, error } = useSelector((state) => state.updateProfile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email };
    dispatch(updateUser(userData));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success(" Profile updated successfully!",{duration:1000});
      dispatch(updateUserReset());
      dispatch(loadUser());
      navigate("/profile");
    }
  }, [isUpdated, error, dispatch, navigate, user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      {/* Toaster for notifications */}

      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-10 w-full sm:w-[80vw] md:w-[60vw] lg:w-[40vw] max-w-3xl">
          {/* Heading */}
          <MetaData title={`Update Profile`} />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans text-gray-800 mb-8 text-center">
            Update Profile
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-left text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-left text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transform hover:scale-105 transition duration-300"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
