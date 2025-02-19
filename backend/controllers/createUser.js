import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/jwtToken.js";
const createUser=async(req,res)=>
{
    const {username,email,password}=req.body;
    if(!username || !email ||!password )
    {
        res.status(404).json({message:"Please Fill All The Inputs Yar"});
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
                res.status(404);
                throw new Error("Invalid Password");
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

 const getAllUsers=async(req,res)=>
 {
    const userData=await User.find({});
    res.json(userData);
 }

 const getUserData=async(req,res)=>
 {
    const user=await User.findById(req.user._id);
    if(user)
    {
        res.json({
            _id:user._id,
            username:user.username,
            email:user.email,
        });
    }
    else
    {
        res.status(404);
        throw new Error("Unauthorized");
    }
 }

 const updateUserData=async(req,res)=>
 {
    const userData=await User.findById(req.user._id);
    if(userData)
    {
        userData.username=req.body.username ||userData.username;
        userData.email=req.body.email||userData.email;
        const salt=await bcrypt.genSalt(10);
        const updatedPasswordEnter=req.body.password |userData.password;
  
        const hashCodePassword=await bcrypt.hash(updatedPasswordEnter,salt);
        userData.password=hashCodePassword || userData.password;

        const updatedUser=await userData.save();
        res.json({
            _id:updatedUser._id,
            username:updatedUser.username,
            email:updatedUser.email,
        });
    }
    else
    {
        res.status(404);
        throw new Error("User Is Not Defined");
    }
 }

 const deleteUserById=async(req,res)=>
 {
    //We Pass Id By Url Parameter Thats Why We Use req.param.id
    const userId=req.params.id;
    const user=await User.findById(userId);
    if(user)
    {
        if(user.isAdmin)
        {
            throw new Error("Canot Delete Admin");
        }else
        {
            await User.deleteOne({_id:user._id});
            res.json({message:"User Delete Successfully"});
        }
    }
    else
    {
        res.status(404);
        throw new Error("User Is Not Exist");
    }
 }

 const getSpecificUserById=async(req,res)=>
 {
    const user=await User.findById(req.params.id).select('-password');//It Gives All Data Of User By It's Id Expect It's Password
    if(user)
    {
        res.json(user);
    }
    else
    {
        res.json({message:"User Is Not Present"});
    }
 }

 const updateById=async(req,res)=>
 {
    const user=await User.findById(req.params.id);//Except Password
    if(user)
    {
        user.username=req.body.username||user.username;
        user.email=req.body.email||user.email;
        const updatedUser=await User.save();
        res.json({
            _id:updatedUser._id,
            username:updatedUser.username,
            email:updatedUser.email,
        });
    }
    else
    {
        res.status(404);
        throw new Error("User If Not Present");
    }
 }
export  {createUser,userLogin,userLogout,getAllUsers,getUserData,updateUserData,deleteUserById,getSpecificUserById,updateById};
