import React from "react";
import AlertComp from "antd/es/alert/Alert";

const Alert = ({ type, children, color }) => {
  return (
    <AlertComp
      message={children}
      type={type}
      className={`text-[${color}] w-full`}
    />
  );
};

export default Alert;
