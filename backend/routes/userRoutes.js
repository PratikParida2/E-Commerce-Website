import express from "express";
import {createUser,userLogin,userLogout} from "../controllers/createUser.js";
import { verifyToken,authorized } from "../middlewares/authMiddleware.js";
const router=express.Router();
router.route('/').post(createUser);
router.post('/login',userLogin);
router.post('/logout',userLogout);
export default router;