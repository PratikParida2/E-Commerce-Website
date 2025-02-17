import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
const createUser=async(req,res)=>
{
    const {username,email,password}=req.body;
    if(!username || !email ||!password )
    {
        res.status(400).send({message:"Please Fill All The Inputs Yar"});
    }
    const userMail=await User.findOne({email});
    if(userMail)
    {
        res.status(401).send({message:"This Mail Id Already Registered"});
    }
    else
    {
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        const newUser=new User({username,email,password:hashPassword});
        await newUser.save();
        res.status(201).send("User Registered Successfully");
    }

};

export default createUser;
