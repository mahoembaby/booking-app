import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URl);
    console.log("MongoDB is Running...");
  } catch (error) {
    console.log("Erorr in Database: ", error);
  }
};
