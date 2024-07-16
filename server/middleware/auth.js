import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  //ACCESS THE TOKEM
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = req.cookies.token;
  //   console.log(token);

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Access denied" });
  }

  // VERIFY THE TOKEN
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    console.log("Auth error " + err);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid token" });
  }
};
