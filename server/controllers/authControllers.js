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

        if(password.length <8 || password.length>16){
            return next(new ErrorHandler("Password must be between 8 and 16 characters", 400));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });
        const verificationCode = await user.generateVerificationCode();
        //  these will help to save the user in the database and also will send the verification code to the user's email address
        await user.save();
        sendVerificationEmail(user.email, verificationCode, res);

    }catch(err){

    }
})
