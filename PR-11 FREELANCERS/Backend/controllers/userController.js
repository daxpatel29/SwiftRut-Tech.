const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
    };
    let data = await User.create(user);
    generateToken(user._id, res);
    res.status(201).send({ message: "User created successfully", user: data });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "error creating user", error: e.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid password" });
    }
    generateToken(user._id, res);
    res.json({ message: "Logged in successfully", user: user });
  } catch (error) {
    res.status(500).json({ message: "error login user", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error logout user", error: error.message });
  }
};

module.exports = { signup, login, logout };
