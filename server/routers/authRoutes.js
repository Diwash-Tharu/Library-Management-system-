import express from "express";
import { login, register,logout } from "../controllers/authControllers.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/register", register);
// router.post("/verify",verifyOTP) ;
router.post("/login", login);
router.get("/logout", isAuthenticated,  logout);

export default router;
