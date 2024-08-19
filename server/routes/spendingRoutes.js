import express from "express";
import {
  createNewSpending,
  getAllContributors,
  getAllSpendings,
} from "../controller/spendings/spendings.js";
import { authenticate } from "../middleware/auth.js";

const spendingRoutes = express.Router();

spendingRoutes.get("/get-all", authenticate, getAllSpendings);
spendingRoutes.post("/spending/new", authenticate, createNewSpending);
spendingRoutes.get("/spending/:id", authenticate, getAllContributors);

export default spendingRoutes;
