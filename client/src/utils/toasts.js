import { Bounce } from "react-toastify";

export default {
  warning: {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
    transition: Bounce,
  },
  style: {
    margin: "1rem",
    width: "90%",
    fontSize: "small",
    fontFamily: "DM Sans",
    fontWeight: "normal",
  },
};
