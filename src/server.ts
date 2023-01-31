import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
config(); // Load .env file
if (!process.env.MONGO_URL) throw new Error("MONGO_URL is not defined");
if (!process.env.PORT) throw new Error("PORT is not defined");
if (!process.env.DEFAULT_IMAGE) throw new Error("DEFAULT_IMAGE is not defined");

const app = express();
app.use(express.json());
connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .then(() => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
