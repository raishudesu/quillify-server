import express from "express";
import { blogsRouter } from "./routes/blogs";
import cors from "cors";
import { userRouter } from "./routes/userAuth";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config(); // run env configuration to use env files

// express app
const app = express();

const { PORT, MONGO_URI } = process.env; //specify your port and database uri in your .env file

// app.use(express.json({ limit: "10mb" })); // Adjust the limit as needed

// middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Adjust the limit as needed
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
); //set the client side address for setting up cookies
app.use(cookieParser());
app.use((req, res, next) => {
  //and origin
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/blogs", blogsRouter);
app.use("/api/auth", userRouter);

// connection to mongodb
mongoose
  .connect(MONGO_URI as string)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log(`Connected successfully @PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
