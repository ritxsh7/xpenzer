import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  addFriend,
  getAllFriends,
  getFriendsLike,
  getMutualContributions,
  getUsersLike,
  settleBalance,
  settleTransction,
} from "../controller/friends/friends.js";

const friendRoutes = express.Router();

friendRoutes.get("/all", authenticate, getAllFriends);
friendRoutes.get("/", authenticate, getFriendsLike);
friendRoutes.get("/users", getUsersLike);
friendRoutes.post("/new", authenticate, addFriend);
friendRoutes.get("/transactions", authenticate, getMutualContributions);
friendRoutes.patch("/settle-balance", authenticate, settleBalance);
friendRoutes.put("/settle-transaction", authenticate, settleTransction);

export default friendRoutes;
