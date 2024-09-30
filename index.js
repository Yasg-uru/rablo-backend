import express from "express";
import { config } from "dotenv";
import { connectDb } from "./utils/connectDb.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
const PORT = process.env.PORT || 4000;
app.use("/user",userRouter);
connectDb();
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});
