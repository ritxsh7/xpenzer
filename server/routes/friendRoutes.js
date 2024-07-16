import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  createNewRegisteredFriend,
  createNewUnregisteredFriend,
} from "../controller/friends/friends.js";
import {
  newRegisteredFriendValidator,
  newUnregisteredFriendValidator,
} from "../helpers/validation.js";

const friendsRouter = express.Router();

friendsRouter.post(
  "/new/unregistered",
  authenticate,
  newUnregisteredFriendValidator,
  createNewUnregisteredFriend
);

friendsRouter.post(
  "/new/registered",
  authenticate,
  newRegisteredFriendValidator,
  createNewRegisteredFriend
);

export default friendsRouter;
