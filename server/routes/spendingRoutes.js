import express from "express";
import {
  createNewSpending,
  getAllSpendings,
} from "../controller/spendings/spendings.js";
import { authenticate } from "../middleware/auth.js";

const spendingRoutes = express.Router();

spendingRoutes.get("/get-all", authenticate, getAllSpendings);
spendingRoutes.post("/new", authenticate, createNewSpending);

export default spendingRoutes;
