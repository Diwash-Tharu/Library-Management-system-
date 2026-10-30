import ErrorHandler from "../middlewares/errorMiddlewares.js";

import {catchAsyncError} from "../middlewares/cathAsyncError.js";
import {User} from "../models/userModel.js";
import bcrypt from "bcrypt"
import crypto from "crypto"
import { sendVerificationCode } from "../utils/sendVerificationCode.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncError(async(req, res, next)=>{
    try{
        const {name, email, password}= req.body;
        if(!name || !email || !password){
            return next(new ErrorHandler("Please enter all fields", 400));
        }
        // const isRegistered = await User.findOne({email, accountVerified:true})
        // if(isRegistered){
        //     return next(new ErrorHandler("User already registered", 400));
        // }
        //  thes will helpt  to store the opt and also will be used for the number of attemped to login or registered 
        const  registerationAttemptsByUser = await User.find({
            email,
             accountVerified:false
        })
        if(registerationAttemptsByUser.length >= 6){
            return next(new ErrorHandler("You have exceeded the maximum number of registration attempts. Please try again later.", 400));
        }


        // if(password.length > 3 && password.length < 16){
        //     return next(new ErrorHandler("Password must be between 8 and 16 characters", 400));
        // }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });
       

           // Generate and assign the verification code
        const verificationCode = user.generateVerificationCode();

        // res.status(201).json({
        //     success: true,
        //     message: "User registered successfully",
        //     user
        // });
        //  these will help to save the user in the database and also will send the verification code to the user's email address
        await user.save();
        sendVerificationCode(user, verificationCode, res);
        user.verificationCode = verificationCode;
        // user.save();



        // sendToken(user, 201, "User logged in successfully", res);


    }catch(err){
        console.log(err);    
        return next(new ErrorHandler(err.message, 500));
    }
})



// export const verifyOTP = catchAsyncError(async(req, res, next)=>{
//      const {email, otp}= req.body;
//      if(!email || !otp){
//         return next(new ErrorHandler("Please enter all fields", 400));
//     }
//     try{
//          const user = await User.findOne({email});
//          if(!user){
//             return next(new ErrorHandler("No user found with this email", 400));
//          }
//          sendToken(user, 200, "User verified successfully", res);

//          console.log("User verified successfully:",sendToken);

//     }
//     catch(err){
//         console.log("err in the token generation", err);

//     }

// })


// export const verifyOTP = catchAsyncError(async(req, res, next)=>{
//     const {email, otp}= req.body;

//     // Check if email and otp are provided

//     if(!email || !otp){
//         return next(new ErrorHandler("Please enter all fields", 400));
//     }
//     try{

//         const userAllEnteries = await User.find({
//             email,
//             // accountVerified:false
//         }).sort({ createdAt: -1 });

//         if(userAllEnteries.length === 0){
//             return next(new ErrorHandler("No unverified user found with this email", 400));
//         }
//         if(!userAllEnteries){
//             return next(new ErrorHandler("No unverified user found with this email", 400));
//         }

//         let user;
//         if(userAllEnteries.length >1 ){
//             user= userAllEnteries[0];
//             await User.deleteMany({
//                 //  here thee auqety will tell me thata i need to delet aall the other entries of the user except the one that is being verified and also the account is not verified yet
//                 _id:{$ne:user._id},
//                 email,
//                 // accountVerified:false
//             })
        
//             }else{
//                 user= userAllEnteries[0];
//             }

        
//         // console.log("User found for OTP verification:", user);

//         // if(user.verificationCode !== Number(otp)){
//         //     return next(new ErrorHandler("Invalid OTP", 400));
//         // }
        
//         sendToken(user, 200, "User verified successfully", res);

//         return res.status(200).json({
//             success:true,
//             message:"User verified successfully",
//             user,
//         })


//         // const currentTime= Date.now();

//         // const verificationCodeExpore = new Date(user.verificationCodeExpire).getTime();
//         // if(currentTime > verificationCodeExpore){
//         //     return next(new ErrorHandler("OTP has expired", 400));
//         // }
//         // // user.accountVerified = true;
//         // user.verificationCode = null;
//         // user.verificationCodeExpire = null;
//         // await user.save();

//     }


//     catch(error){
//         console.error("Error in verifyOTP:", error);
//         return next(new ErrorHandler(error.message, 500));
//     }
// })



export const login = catchAsyncError(async(req, res, next)=>{
    console.log("login controller called");
    const {email, password}= req.body;
    // if(!email || !password){
    //     return next(new ErrorHandler("Please enter all fields", 400));
    // }
    // const user = await User.findOne({email, accountVerified:true}).select("+password");
    // if(!user){
    //     return next(new ErrorHandler("User not found", 404));
    // }
    // const isMatch = await bcrypt.compare(password, user.password);
    // if(!isMatch){
    //     return next(new ErrorHandler("Invalid credentials", 401));
    // }

   if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
}

const user = await User.findOne({
    email: email.trim().toLowerCase(),
    accountVerified: true,
}).select("+password");

console.log("User found:", user);
console.log("Provided email:", email);
console.log("Provided password:", password);
if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
}

console.log("User logged in successfully:", user);

sendToken(user, 200, "User logged in successfully", res);

// res.status(200).json({
//     success: true,
//     message: "User logged in successfully",
//     user,})

})


export const logout = catchAsyncError(async(res, req, next)=>{
    // res.status(200).cookie("token", null, {
    //     expires: new Date(Date.now()),
    //     httpOnly:true,
    // }).json({
    //     success:true,
    //     message:"User logged out successfully"
    // })

})