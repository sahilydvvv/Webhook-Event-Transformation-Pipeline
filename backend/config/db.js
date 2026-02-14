import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if(!MONGO_URI){
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        const response = await mongoose.connect(MONGO_URI);
        console.log("database connected successfully");
        
    } catch (error) {
        console.log("error connection to db",error);
        process.exit(1);
    }
}