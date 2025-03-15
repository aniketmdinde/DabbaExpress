import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const verifyUserJWT = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-otp -refresh_token");

    if (!user || !user.is_logged_in) {
      return res.status(403).json({ message: "Session expired. Please log in again." });
    }

    req.user = user;
    next();
  } catch (error) {
    const message = error.name === "TokenExpiredError"
      ? "Session expired. Please log in again."
      : "Unauthorized: Invalid token.";

    return res.status(401).json({ message });
  }
};