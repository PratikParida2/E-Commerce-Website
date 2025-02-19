//Packages
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import path from 'path';
import mongoose from "mongoose";
//utilities
import DatabaseConnection from '../backend/config/Db.js';
import userRoutes from './routes/userRoutes.js'
//This Thing Use For It Upload Envirment Variable From .env File To process.env
dotenv.config();
const port=process.env.Port||3000;


const app=express();
//Using This Raw Json Data Is Converted To Javascript Object
//The Incoming Data From Client Side Like Json data Available On req.body()  Most Of The app.use() method used for getting client side Data to req.body related Thing
app.use(express.json());
// middleware in Express.js that parses incoming URL-encoded form data from POST requests and makes it available in req.body.
app.use(express.urlencoded({extended:true}));

//app.use() method call for execute middleware function may be global or not like authentication 

app.use(cookieParser());



// app.get('/',(req,res)=>{
//     console.log(req.body);
//     res.send("<h1>E Commerce Website</h1>");

// });

DatabaseConnection();


app.use('/api/users',userRoutes);

app.listen(port,()=>{
    console.log("Server Is Started");
});