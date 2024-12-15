const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(401).send({ message: "not Authorized" });
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({ message: "Invalid Token" });
    }
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};

module.exports = auth;
