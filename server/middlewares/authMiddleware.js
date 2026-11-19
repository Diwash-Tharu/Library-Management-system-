import { catchAsyncError } from "./cathAsyncError.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./errorMiddlewares.js";
import { User } from "../models/userModel.js";

// catchAsyncError


export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log("Token from cookies:", token);
    if (!token) {
        // return res.status(401).json({
        //     success: false,
        //     message: "Please login to access this resource",
        // });
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // console.log("Decoded Token:", decoded);
    //  here we can get he user id since while making the token we have used the user id as payload 
    //  here the usse will store all the data in the from of jason file 
    req.user = await User.findById(decoded.id);
    if(!req.user){
         return next(new ErrorHandler("Please login to access this resource", 401));
    }
    
    next();
})


//  here inlcude is a method which is used to check if the role of the user is present in the roles array or not
//  basically  this is  a method as same as the inlcue in the python 
export const isAuthorized = (...roles) => {
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`You are not allowed to access this resource (${req.user.role})`, 403));  
        }
        next();
    }

}