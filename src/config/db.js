import mongoose from "mongoose";

const connectDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed");
    throw error;
  }
};

console.log("Mongo URI:", process.env.MONGO_URI);

export default connectDB;