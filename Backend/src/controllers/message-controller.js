import User from '../models/user-model.js';
import Message from '../models/message-model.js';
import cloudinary from '../lib/cloudinary.js';
import { io } from '../lib/socket.js';
import { getRecieverSocketId } from '../lib/socket.js';
export const getUsers = async (req, res) => {
    try {
        const cur_user = req.user;
        const users = await User.find({ _id: { $ne: cur_user._id } }).select("-password -__v");
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    const { id } = req.params;
    try {
        const senderId = req.user._id;
        const messages = await Message.find({ $or: [{ senderId: senderId, receiverId: id }, { senderId: id, receiverId: senderId }] });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { _id: senderId } = req.user;
        const { text, image } = req.body;
        let imageUrl = null;
        if (image) {
            const res = await cloudinary.uploader.upload(image);
            imageUrl = res.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });
        await newMessage.save();
        const receiverSocketId = getRecieverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage",newMessage);

        }
    
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};