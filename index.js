import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import hotelsRoute from "./routes/hotelsRoute.js";
import roomsRoute from "./routes/roomsRoute.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const messageError = err.message || "Server is invalid.";
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: messageError,
    stack: err.stack,
  });
});

connectDB();
app.listen(PORT, () => {
  console.log("Server is Running on port: ", PORT);
});
