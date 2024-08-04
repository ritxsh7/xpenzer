import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const RedirectAlreadyLogin = ({ children }) => {
  const user = useSelector((store) => store.user);
  return user.isAuthenticated ? <Navigate to="/" /> : children;
};

export default RedirectAlreadyLogin;
