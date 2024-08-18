import jwt from "jsonwebtoken";
import response from "../helpers/response.js";

export const authenticate = (req, res, next) => {
  //ACCESS THE TOKEM
  const token = req.cookies.token;

  if (!token) {
    return response.unAuthorized(res, "Anthorized");
  }
  // VERIFY THE TOKEN
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    console.log("Auth error " + err);
    return response.unAuthorized(res, "Auth error");
  }
};
