import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/config.js';

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies["jwt-netflix"];

  if (!token) {
      return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, ENV_VARS.JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(401).json({ message: "Unauthorized" });
      }
      req.userId = decoded.userId; // Attach user ID to request
      next(); // Proceed to the next middleware
  });
};

  
