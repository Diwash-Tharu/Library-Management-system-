import ErrorHandler from "../middlewares/errorMiddlewares";

import {catchAsyncError} from "../middlewares/cathAsyncError.js"
import {User} from "../models/userModel.js";
import bcrypt from "bcrypt"
import crypto from "crypto"

export const register = catchAsyncError(async(req, res, next)=>{})
