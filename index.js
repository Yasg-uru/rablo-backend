import express from "express";
import { config } from "dotenv";
import { connectDb } from "./utils/connectDb.js";
config();

const app = express();
const PORT = process.env.PORT || 4000;
connectDb();
app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});
