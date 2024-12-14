const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoute");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => {
  console.log("listening....");
  connectDB();
});
