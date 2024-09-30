import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import ErrorHandler from "../utils/errorhandler.utils.js";
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("this is a token in auth middleware" + token);
    if (!token) {
      return next(
        new ErrorHandler("token is undefined please login to continue ", 404)
      );
    }
    const decodeddata = jwt.verify(token, process.env.JWT_SECRET);

    console.log("this is a decoded data :" + decodeddata);
    req.user = decodeddata;

    return next();
  } catch (error) {
    return next(new ErrorHandler(error?.message, 404));
  }
};
export const authorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} is not allowed to access this resources`
        )
      );
    }
    return next();
  };
};
