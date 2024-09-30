import express from "express";
import {
  createGroup,
  getAllGroups,
  getGroupExpenses,
  getGroupMembers,
} from "../controller/groups/groups.js";
import { authenticate } from "../middleware/auth.js";

const groupRoutes = express.Router();

groupRoutes.post("/new", authenticate, createGroup);
groupRoutes.get("/all", authenticate, getAllGroups);
groupRoutes.get("/group/members", authenticate, getGroupMembers);
groupRoutes.get("/group/chat", authenticate, getGroupExpenses);

export default groupRoutes;
