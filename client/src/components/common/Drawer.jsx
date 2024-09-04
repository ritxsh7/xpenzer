import React from "react";
import navbar from "../../utils/navbar.jsx";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./styles.js";

const Drawer = () => {
  /* Drawer comp here */

  // Url reading
  const { pathname } = useLocation();

  return (
    <ul className={styles.drawer.container}>
      {navbar.map((item) => (
        <NavLink to={item.url} key={item.name}>
          <div
            className={styles.drawer.link(pathname, item.url, item.subRoutes)}
          >
            <div className={`${item.size}`}>{item.icon}</div>
            <p className={styles.drawer.name}>{item.name}</p>
          </div>
        </NavLink>
      ))}
    </ul>
  );
};

export default Drawer;
