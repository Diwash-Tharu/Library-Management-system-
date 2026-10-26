import express from 'express';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './database/db.js';


export const app = express();

config ({path: "./config/config.env"});

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

//  these line will use to set the cookie-parser middleware in your Express application. 
app.use(cookieParser());

//  these below line is used to parse the incoming request body in JSON format. It allows the server to handle requests with JSON payloads, making it easier to work with data sent from clients in a structured format.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

