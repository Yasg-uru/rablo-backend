import { Router } from "express";
import userController from "../controller/user.controller.js";
const userRouter=Router();
userRouter.post("/register",userController.Register);

export default userRouter;