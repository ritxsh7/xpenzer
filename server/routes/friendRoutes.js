import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  getAllFriends,
  getFriendsLike,
  getUsersLike,
} from "../controller/friends/friends.js";

const friendRoutes = express.Router();

friendRoutes.get("/all", authenticate, getAllFriends);
friendRoutes.get("/", authenticate, getFriendsLike);
friendRoutes.get("/users", getUsersLike);

export default friendRoutes;
