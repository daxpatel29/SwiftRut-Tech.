import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { genrateTokenSecretCookie } from '../utils/genrateToken.js';
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        console.log("Signup request received:", req.body);

        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({ email, password: hashedPassword, username });
        await newUser.save();

        res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.error("Error during signup:", error); 
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        await genrateTokenSecretCookie(user._id, res);
        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: "", 
            },
        });
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export async function authCheck(req, res) {
    try {
        console.log("Auth check initiated");
        console.log("req.userId:", req.userId); 
        if (!req.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in authCheck controller", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
