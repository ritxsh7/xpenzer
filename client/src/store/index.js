import { configureStore } from "@reduxjs/toolkit";
import user from "./functions/user";
import ux from "./functions/ux";
import spendingPayload from "./functions/spending.payload";

export default configureStore({
  reducer: {
    user,
    ux,
    spendingPayload,
  },
});
