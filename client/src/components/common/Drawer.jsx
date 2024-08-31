import React from "react";
import navbar from "../../utils/navbar.jsx";
import { NavLink, useLocation } from "react-router-dom";

const Drawer = () => {
  const { pathname } = useLocation();

  return (
    <ul className="fixed bg-[#121212] bottom-0 text-left flex w-full py-3 px-2 items-center justify-around max-w-[450px] mx-auto">
      {navbar.map((item) => (
        <NavLink to={item.url} key={item.name}>
          <div
            className={`flex flex-col items-center h-10 justify-between ${
              pathname == item.url ? "text-blue-600 font-medium" : ""
            }`}
          >
            <div className={`${item.size}`}>{item.icon}</div>
            <p className="text-xs">{item.name}</p>
          </div>
        </NavLink>
      ))}
    </ul>
  );
};

export default Drawer;
