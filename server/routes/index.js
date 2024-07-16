import { Router } from "express";
import spendingRoutes from "./spendingRoutes.js";
import userRoutes from "./userRoutes.js";
import friendsRouter from "./friendRoutes.js";

const routes = Router();

routes.use("/spendings", spendingRoutes);
routes.use("/users", userRoutes);
routes.use("/friends", friendsRouter);

export default routes;
