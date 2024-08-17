import { validationResult } from "express-validator";
import db from "../../config/database.js";
import { date } from "../../utils/constants.js";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import users from "../../services/users.js";
import response from "../../helpers/response.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const signupUser = async (req, res) => {
  try {
    const errors = validationResult(req.body);

    const errorMessages = errors.array().map((err) => err.msg);
    console.log(errorMessages);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: errorMessages,
      });
    }

    // EXTRACT REQ BODY
    const { username, phone, password } = req.body;

    // HASH THE PASSWORD
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.log("Error while hashing the password " + error.message);
    }

    const newUser = await users.createUser(username, phone, hashedPassword);

    return response.ok(res, newUser, "Signup success");
  } catch (error) {
    console.log(error);
    return response.serverError(res, "Error while signing up user");
  }
};

export const loginUser = async (req, res) => {
  //SQL QUERIES
  const FIND_USER = "SELECT * FROM  EXP_USER WHERE HANDLENAME = $1";

  const { handleName, password } = req.body;

  // console.log(handleName, password);
  try {
    const errors = validationResult(req.body);
    const errorMessages = errors.array().map((err) => err.msg);

    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: errorMessages,
      });
    }

    const result = await db.query(FIND_USER, [handleName]);
    const isUser = result.rows[0];
    // console.log(isUser);

    if (!isUser || !(await bcrypt.compare(password, isUser.user_pass))) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      { userId: isUser.user_id, handleName, username: isUser.username },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const user = {
      userId: isUser.user_id,
      handleName: isUser.handlename,
      username: isUser.username,
    };

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(StatusCodes.OK).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.log("Something went wrong while logging in " + error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong while logging in",
    });
  }
};

export const autoLogin = async (req, res) => {
  if (req.user) {
    return res.status(StatusCodes.OK).json({
      message: "Login successful",
      user: req.user,
    });
  }
  return res.status(StatusCodes.UNAUTHORIZED).json({
    message: "Access denied",
  });
};

export const test = async (req, res) => {
  console.log(req.userId);
  return res.status(200).json({
    message: "Test route",
  });
};
