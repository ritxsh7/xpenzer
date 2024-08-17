import { Router } from "express";
import spendingRoutes from "./spendingRoutes.js";
import userRoutes from "./userRoutes.js";
const routes = Router();

routes.use("/spendings", spendingRoutes);
routes.use("/users", userRoutes);

export default routes;
