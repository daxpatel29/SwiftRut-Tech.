const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: "string", required: true, unique: true },
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
});

const User = new mongoose.model("user", userSchema);

module.exports = User;
