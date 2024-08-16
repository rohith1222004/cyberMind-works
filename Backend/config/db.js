import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
export default function connectDB() {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
      console.log(`Database connected: ${process.env.MONGODB_URL}`);
    })
    .catch(err => {
      console.error(`Connection error: ${err.message}`);
      process.exit(1);
    });
}


