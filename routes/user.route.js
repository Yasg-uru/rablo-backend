import { Router } from "express";
import userController from "../controller/user.controller.js";
const userRouter=Router();
userRouter.post("/register",userController.Register);
userRouter.post("/login",userController.Login);
userRouter.post("/forgot-password",userController.forgotPassword);

export default userRouter;