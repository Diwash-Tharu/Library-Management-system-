import "dotenv/config";
import express from 'express';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './database/db.js';
import {errorMiddleware} from "./middlewares/errorMiddlewares.js"
import authRouter from "./routers/authRoutes.js"
import bookRouter from "./routers/bookRouter.js"
import borrowRouter from "./routers/borrowRouter.js"
import userRouter from "./routers/userRouter.js"
// import router from "./routers/authRoutes.js"
import expressFileupload from "express-fileupload"
import { notifyUsers } from "./services/notifyUsers.js";

export const app = express();

config ({path: "./config/config.env"});

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

// app.listen(process.env.PORT, () => {
    //     console.log(`Server is running on port ${process.env.PORT}`);
    // })
    //  these line will use to set the cookie-parser middleware in your Express application. 
    app.use(cookieParser());
    
    //  these below line is used to parse the incoming request body in JSON format. It allows the server to handle requests with JSON payloads, making it easier to work with data sent from clients in a structured format.
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    app.use(expressFileupload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }))
    
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/book", bookRouter);
    app.use("/api/v1/borrow", borrowRouter)
    app.use("/api/v1/user", userRouter)
    
notifyUsers()
connectDB();
app.use(errorMiddleware);
