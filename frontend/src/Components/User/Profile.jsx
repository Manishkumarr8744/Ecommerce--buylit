import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { 
  User, 
  Mail, 
  ShoppingBag, 
  Lock, 
  
  Shield,
  ChevronRight,
  Settings
} from "lucide-react";
import Loader from "../Layouts/Loader/Loader";
import MetaData from "../Layouts/MetaData";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) {
    return <Loader />;
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <MetaData title={`${user.name} Profile`} />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 pt-20">
        <div className="w-full max-w-4xl">
          {/* Profile Header Card */}
          <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden border border-white/20">
            {/* Header Background */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Profile Content */}
            <div className="px-6 sm:px-10 pb-10">
              {/* Avatar */}
              <div className="relative -mt-16 mb-6">
                <div className="w-32 h-32 bg-white rounded-full mx-auto shadow-xl border-4 border-white flex items-center justify-center">
                  {user?.avatar?.url ? (
                    <img 
                      src={user.avatar.url} 
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
                {/* Verified Badge */}
                <div className="absolute bottom-2 right-1/2 translate-x-16 bg-green-500 rounded-full p-1.5 border-4 border-white">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* User Name */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-2">
                {user?.name}
              </h1>
              
              {/* Role Badge */}
              <div className="flex justify-center mb-8">
                <span className="px-4 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium">
                  {user?.role === 'admin' ? 'Administrator' : 'Customer'}
                </span>
              </div>

              {/* User Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Email Card */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm text-gray-500 mb-1">Email Address</p>
                      <p className="text-gray-800 font-medium break-all">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Member Since Card */}
               
              </div>

              {/* Quick Stats */}
              

              {/* Action Buttons */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
                
                {/* View Orders */}
                <Link
                  to="/orders"
                  className="group flex items-center justify-between w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <span>View My Orders</span>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Change Password */}
                <Link
                  to="/password/update"
                  className="group flex items-center justify-between w-full bg-white border-2 border-gray-200 text-gray-800 p-4 rounded-2xl font-medium shadow-sm hover:shadow-lg hover:border-gray-300 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                      <Lock className="w-5 h-5 text-gray-700" />
                    </div>
                    <span>Change Password</span>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Edit Profile - if you have this route */}
                <Link
                  to="/profile/update"
                  className="group flex items-center justify-between w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 p-4 rounded-2xl font-medium shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <Settings className="w-5 h-5 text-gray-700" />
                    </div>
                    <span>Edit Profile</span>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Profile;
