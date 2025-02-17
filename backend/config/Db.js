import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const DatabaseConnection=async()=>
{
    try
    {
        await mongoose.connect(process.env.Database_Url);
        console.log("Succesfully Connected To Mongodb");
    }
    catch(error)
    {
        console.log(error);
    }
}
export default DatabaseConnection;