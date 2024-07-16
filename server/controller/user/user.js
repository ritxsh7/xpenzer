import { validationResult } from "express-validator";
import db from "../../config/database.js";
import { date } from "../../utils/constants.js";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const signupUser = async (req, res) => {
  // INSERT NEW USER
  const CREATE_NEW_USER =
    "INSERT INTO EXP_USER(HANDLENAME, USERNAME, USER_PASS, JOINED_DATE) VALUES ($1, $2, $3, $4) RETURNING * ";

  const CHECK_USERNAME = "SELECT * FROM EXP_USER WHERE USERNAME = $1";

  try {
    const errors = validationResult(req.body);
    const errorMessages = errors.array().map((err) => err.msg);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: errorMessages,
      });
    }

    // EXTRACT REQ BODY
    const { username, handleName, password } = req.body;

    // HASH THE PASSWORD
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
    } catch (error) {
      console.log("Error while hashing the password " + error);
    }

    // CHECK FOR USERNAME
    const checkUsername = await db.query(CHECK_USERNAME, [username]);

    if (checkUsername.rowCount) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "Username already exists",
      });
    }

    const newUser = await db.query(CREATE_NEW_USER, [
      handleName,
      username,
      hashedPassword,
      new Date().toLocaleDateString("en-IN", date.options),
    ]);

    return res.status(StatusCodes.CREATED).json({
      message: "User created successfully",
      data: newUser.rows[0],
    });
  } catch (error) {
    console.log("Error while signing up" + error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error while signing up",
    });
  }
};

export const loginUser = async (req, res) => {
  //SQL QUERIES
  const FIND_USER = "SELECT * FROM  EXP_USER WHERE HANDLENAME = $1";

  const { handleName, password } = req.body;

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

    const token = jwt.sign({ userId: isUser.user_id, handleName }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("token", token, { httpOnly: true });
    return res.status(StatusCodes.OK).json({
      message: "Login successful",
    });
  } catch (error) {
    console.log("Something went wrong while logging in " + error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong while logging in",
    });
  }
};
