import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';

export const checkAuth = async (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Error checking authentication:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}