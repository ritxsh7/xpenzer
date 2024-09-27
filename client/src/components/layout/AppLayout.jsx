import React from "react";
import Header from "../home/Header";
import Drawer from "../common/Drawer";

const AppLayout = ({ children }) => {
  return (
    <div className="p-4">
      <Header />
      <Drawer />
      {children}
    </div>
  );
};

export default AppLayout;
