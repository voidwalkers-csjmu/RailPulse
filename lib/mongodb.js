import mongoose from "mongoose";


let isConnected = false; 

const connectDB = async () => {
     if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;