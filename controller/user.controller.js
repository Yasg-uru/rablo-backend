import userModel from "../model/user.model.js";
import { getToken, isCorrectPassword } from "../utils/auth.util.js";
import ErrorHandler from "../utils/errorhandler.utils.js";
import bcrypt from "bcryptjs";
import sendtoken from "../utils/sendToken.js";

class userController {
  static async Register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const ExistingUser = await userModel.findOne({ email });
      if (ExistingUser) {
        return next(new ErrorHandler(400, "User Already Exist "));
      }
      const salt = 10;
      const hashedpassword = await bcrypt.hash(password, salt);
      const newUser = new userModel({
        name,
        email,
        password: hashedpassword,
      });
      newUser.save();
      const Token = getToken(newUser);

      sendtoken(200, res, newUser, Token);
    } catch (error) {
      console.log("this is a error", error);
      next(error);
    }
  }
  static async Login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler(404, "Please Enter valid credentials"));
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        return next(new ErrorHandler(404, "User not found"));
      }
      const ispasswordCorrect = await isCorrectPassword(password, user.password);
      if (!ispasswordCorrect) {
        return next(new ErrorHandler(400, "Please Enter valid credentials"));
      }
      const Token=getToken(user);
      sendtoken(200,res,user,Token);
    } catch (error) {
        console.log("this is error :",error)
        next(error)
    }
  }
}
export default userController;
