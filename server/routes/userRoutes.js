import { Router } from "express";
import {
  autoLogin,
  getAllNotifications,
  loginUser,
  readNotifications,
  signupUser,
} from "../controller/users/users.js";
import { loginValidators, signupValidators } from "../helpers/validation.js";
import { authenticate } from "../middleware/auth.js";

const userRoutes = Router();

userRoutes.post("/user/signup", signupValidators, signupUser);
userRoutes.post("/user/login", loginValidators, loginUser);
userRoutes.get("/user/auth", authenticate, autoLogin);
userRoutes.get("/notifications", authenticate, getAllNotifications);
userRoutes.put("/notifications/read", authenticate, readNotifications);

export default userRoutes;
