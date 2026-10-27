import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        //  here slect fasle is writen for the security purpose bcause if we set select:true then it will return the password in the response and it is not good for security purpose so we set select:false so that it will not return the password in the response.
        select:false,

    },
    role:{
        type:String,
        default:"user",
        enum:["user", "admin"],
    },
    accountVerified:{
        type:Boolean,
        default:false,
    },
    borrowedBooks:[
        {

            //  here there is a reference to another collection called "Borrow" in the MongoDB database. The bookId field is of type ObjectId, which is a special type used to uniquely identify documents in MongoDB. By using ref: "Borrow", it establishes a relationship between the user and the borrowed books, allowing you to populate the borrowedBooks array with data from the Borrow collection when querying the user document.
            //  these menas bookID will store only the Borrow collection's ID and it will not store the whole Borrow collection's data.
            bookId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Borrow", 
            },
            returned:{
                type:Boolean,
                default:false,
            },
            bookTitle:String,
            borrowedDate:Date,
            dueDate:Date,
        }
    ],
    avatar:{
        public_id: String,
        url:String,
    },
    verificationCode:Number,
    verificationCodeExpire:Date,
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    

},{timestamps:true});

const User = mongoose.model("User", userSchema) || mongoose.models.User;