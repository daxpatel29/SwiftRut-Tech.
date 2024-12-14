require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const connectWithDB = require("./config/db");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const router= require('./routes/user');

// Connect with database
connectWithDB();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json()); // To parse JSON bodies
app.use(cookieParser());

app.use(
  cookieSession({
    name: "session",
    maxAge: process.env.COOKIE_TIME * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
    secure: false, // Set to true in production
    sameSite: "none",
    httpOnly: true,
  })
);

// Middleware to handle JSON
app.use(express.json());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Use express router
app.use("/", router);

// Start the server
app.listen(8090, (err) => {
  if (err) {
    console.log("Error in connecting to server: ", err);
    return; // Exit if there's an error
  }
  console.log(`Server is running on http://localhost:3000`);
});

// Log environment variables for debugging
console.log("Environment Variables Loaded:");
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("CLOUDINARY_NAME:", process.env.CLOUDINARY_NAME);
console.log("CLIENT_URL:", process.env.CLIENT_URL);

module.exports = app;
