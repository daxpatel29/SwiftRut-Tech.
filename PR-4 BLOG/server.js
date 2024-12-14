const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoute");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", (req, res) => {
  res.json({ message: "welcome to personal blog app" });
});

module.exports = app;
