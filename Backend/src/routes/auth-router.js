import express from 'express';
import { signup, login, logout, check, updateProfile } from '../controllers/auth-controller.js';
import { checkAuth } from '../middleware/auth-middleware.js';

const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.put("/update-profile", checkAuth, updateProfile);

authRouter.get("/check-auth", checkAuth, check);

export default authRouter;