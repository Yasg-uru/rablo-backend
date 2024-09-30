import userModel from "../model/user.model.js";
import { getToken } from "../utils/auth.util.js";
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
      const hashedpassword = bcrypt.hash(password, salt);
      const newUser = new userModel({
        name,
        email,
        password: hashedpassword,
      });
      newUser.save();
      const Token = getToken;

      sendtoken(200, res, user, Token);
    } catch (error) {
      next(error);
    }
  }
}
export default userController;

