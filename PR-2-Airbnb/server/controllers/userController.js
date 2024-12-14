const User = require('../models/User');
const cookieToken = require('../utils/cookieToken');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;

// Register/SignUp user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Incoming request data:", req.body); // Log incoming data

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already registered!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
    console.log("Created user:", user); // Log created user

    cookieToken(user, res);
  } catch (err) {
    console.error("Registration error:", err); // Log error
    res.status(500).json({ message: 'Internal server Error', error: err.message });
  }
};


// Login/SignIn user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required!' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User does not exist!' });
    }

    // Match the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Email or password is incorrect!' });
    }

    // Send the token if everything is fine
    cookieToken(user, res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server Error', error: err.message });
  }
};

// Google Login
exports.googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Check if user is already registered
    let user = await User.findOne({ email });

    // If the user does not exist, create a new user in the DB
    if (!user) {
      const hashedPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
      user = await User.create({ name, email, password: hashedPassword });
    }

    // Send the token
    cookieToken(user, res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server Error', error: err.message });
  }
};

// Upload picture
exports.uploadPicture = async (req, res) => {
  const { path } = req.file;
  try {
    const result = await cloudinary.uploader.upload(path, {
      folder: 'Airbnb/Users',
    });
    res.status(200).json(result.secure_url);
  } catch (error) {
    res.status(500).json({ error, message: 'Internal server error' });
  }
};

// Update user
exports.updateUserDetails = async (req, res) => {
  try {
    const { name, password, email, picture } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.name = name;

    if (picture) {
      user.picture = picture;
    }
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    cookieToken(updatedUser, res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Logout
exports.logout = async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,   // Only send over HTTPS
    sameSite: 'none' // Allow cross-origin requests
  });
  res.status(200).json({ success: true, message: 'Logged out' });
};
