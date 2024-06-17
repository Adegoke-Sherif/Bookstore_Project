import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

export const connect = async () => {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in environment variables");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};



// export const connect = async () => {
//   const { MONGODB_URI } = process.env

//   if(MONGODB_URI) {
//     return await mongoose.connect(MONGODB_URI)
//   }
// }