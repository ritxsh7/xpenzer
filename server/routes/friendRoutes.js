import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  addFriend,
  getAllFriends,
  getFriendsLike,
  getMutualContributions,
  getUsersLike,
} from "../controller/friends/friends.js";

const friendRoutes = express.Router();

friendRoutes.get("/all", authenticate, getAllFriends);
friendRoutes.get("/", authenticate, getFriendsLike);
friendRoutes.get("/users", getUsersLike);
friendRoutes.post("/new", authenticate, addFriend);
friendRoutes.get("/transactions", authenticate, getMutualContributions);

export default friendRoutes;
