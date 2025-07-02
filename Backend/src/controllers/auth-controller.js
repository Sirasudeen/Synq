import express from 'express';
import User from '../models/user-model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
export const signup = async (req, res) => {
    // Handle user signup logic here
    // res.status(201).json({ message: "User signed up successfully" });
    const { email, fullName, password, } = req.body;
    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const u = await User.findOne({ email });
        if (u) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const HandledPassword = await bcrypt.hash(password, salt);
        const user = new User({ email: email, fullName: fullName, password: HandledPassword });
        if (user) {
            generateToken(user._id, res);
            await user.save();
            res.status(201).json({ message: "User signed up successfully" });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const login = (req, res) => {
    res.send("Login page");
}
export const logout = (req, res) => {
    // Handle user logout logic here
    res.status(200).json({ message: "User logged out successfully" });
}   