import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin = false, redirectTo = "/login", children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) return null; // or a spinner

  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;
  if (isAdmin && user?.role !== "admin") return <Navigate to={redirectTo} replace />;

  // Allow either nesting with <Outlet /> or wrapping children
  return children ?? <Outlet />;
};

export default ProtectedRoute;