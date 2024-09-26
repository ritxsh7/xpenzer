import express from "express";
import { createGroup, getAllGroups } from "../controller/groups/groups.js";
import { authenticate } from "../middleware/auth.js";

const groupRoutes = express.Router();

groupRoutes.post("/new", authenticate, createGroup);
groupRoutes.get("/all", authenticate, getAllGroups);

export default groupRoutes;
