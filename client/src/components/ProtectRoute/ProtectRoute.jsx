import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { contextData } from "../../context/AppContext";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(contextData);

  if (loading) {
    return <h1>Loading...</h1>; // ✅ Show loading while checking auth
  }
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectRoute;
