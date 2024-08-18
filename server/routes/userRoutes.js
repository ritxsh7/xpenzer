import { Router } from "express";
import { loginUser, signupUser } from "../controller/users/users.js";
import { loginValidators, signupValidators } from "../helpers/validation.js";

const userRoutes = Router();

userRoutes.post("/user/signup", signupValidators, signupUser);
userRoutes.post("/user/login", loginValidators, loginUser);

export default userRoutes;
