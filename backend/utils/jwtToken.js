import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
const createToken=(res,userId)=>{
    //Create A Token 
    const token=jwt.sign({userId},process.env.JWT_SECREATE,{expiresIn:'30d'});
    //Set Jwt As An Http-ony Cookies
    res.cookie("jwt", token, {
        httpOnly: true, // Prevents client-side access to the cookie
        secure: process.env.NODE_ENV === "production", // Secure in production (HTTPS)
        sameSite: "Strict", // Prevent CSRF attacks
        maxAge: 30 *24 * 60 * 60 * 1000, // 30 Days Expiry
      });
    return token;
}
export default createToken;