import express from 'express'
import connectDB from './config/db.js';
import cors from 'cors'
import formRouter from './routes/formRouter.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors())
const PORT = process.env.PORT;
connectDB();

app.use(express.json());


app.use('/postFrom',formRouter)

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server is successfully running, and app is listening on port " + PORT);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
