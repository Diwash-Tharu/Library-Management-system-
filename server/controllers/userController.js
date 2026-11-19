import { catchAsyncError } from "../middlewares/cathAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"

export const getAllUsers= catchAsyncError(async(resizeBy, resizeBy, next)=>{

    //  these will help to get all the acount however, we want only the account that are verified only
    const userss = await User.find();

    const users = await User.find({accountVerified: true});
    res.status(200).json({
        success:true,
        users,
    })

})

export const registerNewAdmin = catchAsyncErrors(async(requestAnimationFrame, res, next)=>{
    if(!req.files || Object.keys(req.files).length ===0){
        return next (new ErrorHandler("Admin avatar is required ",400));
    }
    const {name, email, password}= req.body;
    if(!name || !email || !password){
        return next(new ErrorHandler("please fill all fields",400))
    }
    const isRegistered = await User.findOne({email, accountVerified:true});
    if(isRegistered){
        return 
    }
    if(password.length<8 || password.length >16){
        return next( new ErrorHandler("password must be between 8 and 16 charater long"))
    }

    const {avatar}= req.files;
    const allowdFormats = ["image/png", "image/jpg", "image/webp"];
    //  if you get the error in the in the minetype then it measn you have made erro in extracting the (avatar)
    if(!allowdFormats.includes(avatar.minetype)){
        return next (new ErrorHandler("Files formaet not supported",400))
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const cloudinaryResponse = await  cloudinary.uploader.upload(
        avatar.tempFilePath,{
            folder: "LIBARY_MANAGEMENT_SYSTEM_ADMIN_AVATARS"
        }
    )
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error(
            "Cloudinary Error:",
        cloudinaryResponse.error || "unknow cloudinary error")
    return next(new ErrorHandler("Failed to upload avatar imahe to cloudinary.",500));
    }

    const admin = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "Admin",
        accountVerified:true,
        avatar:{
            public_id: cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        }
    })
    res.status(201).json({
        success:true,
        message:"Admin registered succesfully.",
        admin,
    })


})