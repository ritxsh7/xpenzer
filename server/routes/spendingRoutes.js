import express from "express";
import { getAllSpendings } from "../controller/spendings/spendings.js";

const spendingRoutes = express.Router();

spendingRoutes.get("/get-all", getAllSpendings);

export default spendingRoutes;
