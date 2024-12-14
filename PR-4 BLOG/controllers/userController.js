const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { generateTokenAndSetCookies } = require("../utils/generateToken");
const User = require("../models/userSchema");

const signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    let user = {
      username,
      email,
      password: hashedPassword,
    };

    let data = await User.create(user);
    generateTokenAndSetCookies(data._id, res);
    res.status(200).json({ message: "User created successfully", data: data });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    let isValid = await bcryptjs.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Invalid credentials" });
    generateTokenAndSetCookies(user._id, res);
    res
      .status(200)
      .json({ message: "User logged in successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error: error });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { signup, login, logout };
