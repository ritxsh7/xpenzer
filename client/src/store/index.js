import { configureStore } from "@reduxjs/toolkit";
import user from "./functions/user";
import ux from "./functions/ux";
import spendingPayload from "./functions/spending.payload";
import data from "./functions/data";

export default configureStore({
  reducer: {
    user,
    ux,
    spendingPayload,
    data,
  },
});
