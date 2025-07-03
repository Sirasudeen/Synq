import express from "express";
import { checkAuth } from "../middleware/auth-middleware";
import { getUsers } from "../controllers/user-controller.js";
const router = express.Router();

router.get("/users", checkAuth, getUsers);
router.get("/:id", checkAuth, getMessages);
router.post("/send/:id", checkAuth, sendMessage);