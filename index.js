import express from "express";
import { config } from "dotenv";
import { connectDb } from "./utils/connectDb.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cors from "cors";
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://rablo-frontend-six.vercel.app","http://localhost:5173"],
    credentials: true,
  })
);
const PORT = process.env.PORT || 4000;
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use(errorMiddleware);
connectDb();

app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});
