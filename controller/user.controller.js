import userModel from "../model/user.model.js";
import { getToken, isCorrectPassword } from "../utils/auth.util.js";
import ErrorHandler from "../utils/errorhandler.utils.js";
import bcrypt from "bcryptjs";
import sendtoken from "../utils/sendToken.js";
import sendEmail from "../utils/sendmail.util.js";
import crypto from "crypto";
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
      const ispasswordCorrect = await isCorrectPassword(
        password,
        user.password
      );
      if (!ispasswordCorrect) {
        return next(new ErrorHandler(400, "Please Enter valid credentials"));
      }
      const Token = getToken(user);
      sendtoken(200, res, user, Token);
    } catch (error) {
      console.log("this is error :", error);
      next(error);
    }
  }
  static async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return next(new ErrorHandler(404, "User not found"));
      }

      const resetToken = user.getResetPasswordToken();
      await user.save({ validateBeforeSave: false });

      const resetUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/reset-password/${resetToken}`;

      const message = `You have requested a password reset. Please make a PUT request to: \n\n ${resetUrl}`;

      try {
        await sendEmail({
          email: user.email,
          subject: "Password Reset Request",
          message,
        });

        res.status(200).json({
          success: true,
          message: `Reset token sent to: ${user.email}`,
        });
      } catch (err) {
        user.resetpasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(500, "Email could not be sent"));
      }
    } catch (error) {
      console.log("this is a error in forgot password ");
      next(error);
    }
  }
  static async resetPassword(req, res, next) {
    try {
      const { token } = req.params;
      const user = await userModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        return next(new ErrorHandler(400, "Invalid or expired token"));
      }

      const { password } = req.body;

      const salt = 10;
      user.password = await bcrypt.hash(password, salt);

      user.resetpasswordToken = undefined;
      user.resetPasswordTokenExpire = undefined;

      await user.save();

      const Token = getToken(user);
      sendtoken(200, res, user, Token);
    } catch (error) {
      console.log("error in reset-password:", error);
      next(error);
    }
  }
  static async Logout(req, res, next) {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      console.log("Error in logout:", error);
      next(error);
    }
  }
}
export default userController;
