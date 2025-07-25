import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import { server, app } from "./lib/socket.js";
import authRoutes from "./routes/auth-router.js";
import { connect } from "mongoose";
import message from "./models/message-model.js";
import router from './routes/message-routes.js'
dotenv.config();
import path from 'path';

const __dirname = path.resolve();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", router);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    });
}
console.log("NODE_ENV:", process.env.NODE_ENV);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();

});

