import express from "express";
import { config } from "dotenv";
config();

const app=express();
const PORT=process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`server is running on port : ${PORT}`)
})