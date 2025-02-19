import express from "express";
import {createUser,userLogin,userLogout,getAllUsers,getUserData,updateUserData,deleteUserById,getSpecificUserById,updateById} from "../controllers/createUser.js";
import { verifyToken,authorized } from "../middlewares/authMiddleware.js";
const router=express.Router();
router.route('/')
.post(createUser)
.get(verifyToken,authorized,getAllUsers);
router.post('/login',userLogin);
router.post('/logout',userLogout);
router.route('/profile')
.get(verifyToken,getUserData)
.put(verifyToken,updateUserData);
router.route('/:id')
.delete(verifyToken,authorized,deleteUserById)
.get(verifyToken,authorized,getSpecificUserById)
.put(verifyToken,authorized,updateById)
;
export default router;