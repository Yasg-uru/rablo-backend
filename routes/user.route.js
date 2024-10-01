import { Router } from "express";
import userController from "../controller/user.controller.js";
const userRouter = Router();
userRouter.post("/register", userController.Register);
userRouter.post("/login", userController.Login);
userRouter.post("/logout", userController.Logout);
userRouter.post("/forgot-password", userController.forgotPassword);
userRouter.post("/reset-password/:token", userController.resetPassword);

export default userRouter;
