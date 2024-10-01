import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import ErrorHandler from "../utils/errorhandler.utils.js";
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("this is a token in auth middleware" + token);
    if (!token) {
      return next(
        new ErrorHandler(404, "token is undefined please login to continue ")
      );
    }
    const decodeddata = jwt.verify(token, process.env.JWT_SECRET);

    console.log("this is a decoded data :" + decodeddata);
    req.user = decodeddata;

     next();
  } catch (error) {
    return next(new ErrorHandler(404, error?.message));
  }
};
export const authorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          400,
          `${req.user.role} is not allowed to access this resources`
        )
      );
    }
     next();
  };
};
