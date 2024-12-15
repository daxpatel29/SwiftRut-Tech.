const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const itemRouter = require("./routes/itemRoutes");
const supplierRouter = require("./routes/supplierRoutes");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8090;
app.use(express.json());
app.use(cors());

app.use("/items", itemRouter);
app.use("/suppliers", supplierRouter);

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to inventory management system");
});
// app.listen(PORT, () => {
//   console.log(`listening on ${PORT}`);
// });

module.exports = app;
