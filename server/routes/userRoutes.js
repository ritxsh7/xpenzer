import { Router } from "express";
import { signupUser } from "../controller/users/users.js";
import { signupValidators } from "../helpers/validation.js";

const userRoutes = Router();

userRoutes.post("/user/signup", signupValidators, signupUser);

export default userRoutes;
