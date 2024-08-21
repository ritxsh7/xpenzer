import express from "express";
import { authenticate } from "../middleware/auth.js";
import { getAllFriends } from "../controller/friends/friends.js";

const friendRoutes = express.Router();

friendRoutes.get("/all", authenticate, getAllFriends);

export default friendRoutes;
