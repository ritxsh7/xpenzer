import { Router } from "express";
import { loginUser, signupUser, test } from "../controller/user/user.js";
import { loginValidators, signupValidators } from "../helpers/validation.js";
import { authenticate } from "../middleware/auth.js";

const userRoutes = Router();

userRoutes.post("/signup", signupValidators, signupUser);
userRoutes.post("/login", loginValidators, loginUser);

userRoutes.get("/test", authenticate, test);

export default userRoutes;
