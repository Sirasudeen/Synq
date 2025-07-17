import express from "express";
import { checkAuth } from "../middleware/auth-middleware.js";
import { getUsers,getMessages,sendMessage } from "../controllers/message-controller.js";
const router = express.Router();

router.get("/users", checkAuth, getUsers);
router.get("/:id", checkAuth, getMessages);
router.post("/send/:id", checkAuth, sendMessage);

export default router;