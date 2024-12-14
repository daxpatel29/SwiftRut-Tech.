const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection established");
  } catch (errr) {
    console.error("Error connecting to the database", errr.message);
    process.exit(1);
  }
};

module.exports = connectDB;
