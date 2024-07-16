import { body } from "express-validator";

export const signupValidators = [
  body("username", "Name cannot be empty").notEmpty(),
  body("handleName", "Handlename cannot be empty").notEmpty(),
  body("handleName", "Handlename must be of minimum 6 characters").isLength({
    min: 6,
  }),
  body("password", "Password must be of minimum 6 characters").isLength({
    min: 6,
  }),
];

export const loginValidators = [
  body("handleName", "Handlename cannot be empty").notEmpty(),
  body("password", "Password cannot be empty").notEmpty(),
];

export const newUnregisteredFriendValidator = [
  body("firstName", "First name cannot be empty").not().isEmpty(),
  body("lastName", "Last name cannot be empty").notEmpty(),
];

export const newRegisteredFriendValidator = [
  body("friendId", "Please select a friend ").not().isEmpty(),
];
