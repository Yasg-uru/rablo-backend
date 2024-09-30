import ErrorHandler from "../utils/errorhandler.utils.js";

export const errorMiddleware = (error, req, res, next) => {
  if (error instanceof ErrorHandler) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
  res.status(500).json({
    message: "Internal server error",
  });
};
