import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/jwtToken.js";
const createUser=async(req,res)=>
{
    const {username,email,password}=req.body;
    if(!username || !email ||!password )
    {
        res.status(400).json({message:"Please Fill All The Inputs Yar"});
    }
    const userMail=await User.findOne({email});
    if(userMail)
    {
        res.status(401).json({message:"This Mail Id Already Registered"});
    }
    else
    {
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        const newUser=new User({username,email,password:hashPassword});
        await newUser.save();
        createToken(res,newUser._id);
        res.status(201).json("User Registered Successfully");
    }

};

const userLogin=async (req,res)=>
    {
        const {email,password}=req.body;
        //Find In User Model Is This Email Is Existing
        const existingUser=await User.findOne({email});
        if(existingUser)
        {
            const isPassword=await bcrypt.compare(password,existingUser.password);
            if(isPassword)
            {
                createToken(res,existingUser._id);
                res.status(201).json({message:"Login Succesfully"});
            }
            else
            {
                res.status(401).json({message:"Please Enter Valid Password"});
            }
            return ;
        }
    
    }
 const userLogout=async (req,res)=>
 {
    //Here Cookie Name We Provide Is "jwt" In JwtToken.js
    // res.cookie('jwt',"",{
    //     httpOnly:true,
    //     expire:new Date(0),
    // });
    // res.json({message:"Logout"});

    res.cookie("jwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        expires: new Date(0), // Expire immediately
      });
    
      res.json({ message: "Logout successful" });
 }

export  {createUser,userLogin,userLogout};
