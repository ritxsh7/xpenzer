import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  acceptFriendRequest,
  getAllFriends,
  getFriendsLike,
  getMutualContributions,
  getUsersLike,
  sendFriendRequest,
  settleBalance,
  settleTransction,
} from "../controller/friends/friends.js";

const friendRoutes = express.Router();

friendRoutes.get("/all", authenticate, getAllFriends);
friendRoutes.get("/", authenticate, getFriendsLike);
friendRoutes.get("/users", getUsersLike);
// friendRoutes.post("/new", authenticate, addFriend);
friendRoutes.get("/transactions", authenticate, getMutualContributions);
friendRoutes.patch("/settle-balance", authenticate, settleBalance);
friendRoutes.put("/settle-transaction", authenticate, settleTransction);
friendRoutes.post("/friend-request", authenticate, sendFriendRequest);
friendRoutes.post("/accept-request", authenticate, acceptFriendRequest);

export default friendRoutes;
