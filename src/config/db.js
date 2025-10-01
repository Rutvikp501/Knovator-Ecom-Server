import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Knovator-store",
    });
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB connection failed  ", error);
    process.exit(1);
  }
};
