import User from '../models/user-model.js';

export const getUsers = async (req, res) => {
    try {
        const cur_user = req.user;
        const users = await User.find({ _id: { $ne: cur_user._id } }.select("-password -__v"));
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}