import express from 'express';
import User from '../models/user-model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';
export const signup = async (req, res) => {
    const { email, fullName, password, } = req.body;
    try {
        if (!email || !fullName || !password)
            return res.status(400).json({ message: "Enter details correctly" });
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
            res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      })
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

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        generateToken(user._id, res);
            res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0, });
        res.status(200).json({ message: "User logged out successfully" });
    }
    catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }
        const c_url = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: c_url.secure_url }, { new: true });
        res.status(200).json({
            updatedUser
        });

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const check = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    }
    catch (error) {
        console.error("Error checking user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}