import { configureStore } from "@reduxjs/toolkit";
import user from "./functions/user";
import ux from "./functions/ux";

export default configureStore({
  reducer: {
    user,
    ux,
  },
});
