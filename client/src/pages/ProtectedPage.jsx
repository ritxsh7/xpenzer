import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);
  return user && children;
};

export default ProtectedPage;
