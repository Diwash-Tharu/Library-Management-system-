import ErrorHandler from "../middlewares/errorMiddlewares";

import {catchAsyncError} from "../middlewares/cathAsyncError.js"
import {User} from "../models/userModel.js";
import bcrypt from "bcrypt"
import crypto from "crypto"

export const register = catchAsyncError(async(req, res, next)=>{
    try{
        const {name, email, password}= req.body;
        if(!name || !email || !password){
            return next(new ErrorHandler("Please enter all fields", 400));
        }
        const isRegistered = await User.findOne({email, accountVerified:true})
        if(isRegistered){
            return next(new ErrorHandler("User already registered", 400));
        }
        //  thes will helpt  to store the opt and also will be used for the number of attemped to login or registered 
        const  registerationAttemptsByUser = await User.find({
            email,
             accountVerified:false
        })
        if(registerationAttemptsByUser.length >= 6){
            return next(new ErrorHandler("You have exceeded the maximum number of registration attempts. Please try again later.", 400));
        }

    }catch(err){

    }
})
