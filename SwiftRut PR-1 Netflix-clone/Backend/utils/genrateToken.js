import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/config.js";

export const genrateTokenSecretCookie = (userId, res) => {
  // Ensure that you're passing the secret key to the sign method
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true,
    sameSite: "strict",
    secure: ENV_VARS.MODE_ENV !== "development" // Corrected spelling of "development"
  });

  return token; // Return the generated token
};
