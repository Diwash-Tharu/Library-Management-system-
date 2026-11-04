import express from "express";
import { login, register,logout,getUser,forgotPassword, resetPassword } from "../controllers/authControllers.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/register", register);
// router.post("/verify",verifyOTP) ;
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/user", isAuthenticated, getUser);
router.get("/logout", isAuthenticated,  logout);
router.put("/password/reset/:token", resetPassword);



export default router;
