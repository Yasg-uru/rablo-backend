import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    console.log(`database is connected with : ${response.connection.host}`);
  } catch (error) {
    console.log(`error in connectivity of database `);
    process.exit(1);
  }
};
