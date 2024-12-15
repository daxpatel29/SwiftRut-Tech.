const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const projectRouter = require("./routes/projectRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 8090;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/projects", projectRouter);

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Freelancer Project Management System API");
});

// app.listen(PORT, () => {
//   console.log("listening....");
// });
module.exports = app;
