import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/user.route.js";
import webhookRoutes from "./routes/webhook.route.js";
import razorpayRoutes from "./routes/razorpay.route.js";

const app= express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
));
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/webhook',webhookRoutes);
app.use('/api/razorpay', razorpayRoutes);


const startServer = async () => {
  try {
    // await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start", error);
    process.exit(1);
  }
};

startServer();