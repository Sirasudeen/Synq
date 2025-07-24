import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import {server,app} from "./lib/socket.js";
import authRoutes from "./routes/auth-router.js";
import { connect } from "mongoose";
import message from "./models/message-model.js";
import router from './routes/message-routes.js'
dotenv.config();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, 
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();

});