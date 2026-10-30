import { catchAsyncError } from "./cathAsyncError.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./errorMiddlewares.js";
import { User } from "../models/userModel.js";


export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    console.log("Token from cookies:", token);
    if (!token) {
        // return res.status(401).json({
        //     success: false,
        //     message: "Please login to access this resource",
        // });
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    console.log("Decoded Token:", decoded);
    req.user = await User.findById(decoded.id);
    next();
})