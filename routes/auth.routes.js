import { Router } from "express";
import { registerUser, loginUser, getAuthenticatedUser, resetPassword } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authenticateUser, getAuthenticatedUser);
router.post("/reset-password", resetPassword);

export default router;
