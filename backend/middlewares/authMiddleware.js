import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
//Real Life Example Like Someone Not Login But Want To Access Dashboard
dotenv.config();
const verifyToken=async (req,res,next)=>
{
    let token=req.cookies.jwt;//Get Jwt From Cookies 
    if(!token)
    {
        res.status(401).json({message:"Unauthorized"});
    }
    try 
    {
        const decode=jwt.verify(token,process.env.JWT_SECREATE);//Decode THe Jwt
        req.user = await User.findById(decode.userId).select('-password'); //when fresh user data is required (e.g., displaying user profile, checking account status).//asing decode jwt value to req.user
        next();
    } 
    catch (error) 
    {
        res.status(401).json({message:"Invalid Token"});
    }
}

const authorized=(req,res,next)=>{
    //We Can Use req.user we assign value req.user in verifyToken function We Can Use Here Due To veryfyToken Middleware Run First Then Gie Access To Next Middleware
    if(req.user && req.user.isAdmin)
    {
        next();
    }
    else
    {
        res.status(401).json({message:"Not Authorized As An Admin"});
    }
}
export {verifyToken,authorized};