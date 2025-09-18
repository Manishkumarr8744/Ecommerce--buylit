import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Mail, User, ShieldCheck, Save } from "lucide-react";
import SideBar from "./Sidebar";
import {
  getUserDetails,
  updateUserRole,
  clearError,
} from "../../Reducer/UserReducer/userAction";
import Loader from "../../Components/Layouts/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserReset } from "../../Reducer/UserReducer/userProfleReducer";
import toast, { Toaster } from "react-hot-toast";
import MetaData from "../Layouts/MetaData";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updateProfile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id: userId } = useParams();

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearError());
    }

    if (isUpdated) {
      toast.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch(updateUserReset());
    }
  }, [dispatch, error, navigate, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    if (!name || !email || !role) {
      toast.error("Please fill all fields");
      return;
    }

    const userData = { name, email, role };
    dispatch(updateUserRole(userId, userData));
  };

  return (
    <Fragment>
      <MetaData title={`Update User`} />

      <div className="flex min-h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-2xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <Loader />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 md:p-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                    Update User
                  </h1>

                  <form
                    onSubmit={updateUserSubmitHandler}
                    className="space-y-6"
                  >
                    {/* User ID Display */}
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">User ID:</span> {userId}
                      </p>
                    </div>

                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Enter user name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          placeholder="Enter email address"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Role Select */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <ShieldCheck className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Choose Role</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </div>
                    </div>

                    {/* Current Role Display */}
                    {user && (
                      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                        <p className="text-sm text-blue-800">
                          <span className="font-medium">Current Role:</span>{" "}
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 ${
                              user.role === "admin"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <button
                        type="submit"
                        disabled={updateLoading}
                        className={`flex-1 sm:flex-initial inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors ${
                          updateLoading
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {updateLoading ? (
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
                            Updating...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5 mr-2" />
                            Update User
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate("/admin/users")}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
