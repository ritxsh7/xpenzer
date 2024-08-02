import React from "react";
import AlertComp from "antd/es/alert/Alert";

const Alert = ({ type, children }) => {
  return (
    <AlertComp
      message={children}
      type={type}
      className="font-semibold text-red-700"
    />
  );
};

export default Alert;
