import { Router } from "express";
import { loginUser, signupUser } from "../controller/user/user.js";
import { loginValidators, signupValidators } from "../helpers/validation.js";

const userRoutes = Router();

userRoutes.post("/signup", signupValidators, signupUser);
userRoutes.post("/login", loginValidators, loginUser);

export default userRoutes;
