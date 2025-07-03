import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth-router.js";
import { connect } from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();

});