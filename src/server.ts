import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import UserRouter from "./Routers/UserRouter";
import AuthRouter from "./Routers/AuthRouter";
import ProductRouter from "./Routers/ProductRouter";
import CartRouter from "./Routers/CartRouter";
import cookieParser from "cookie-parser";

config(); // Load .env file

if (!process.env.MONGO_URL) throw new Error("MONGO_URL is not defined");
if (!process.env.PORT) throw new Error("PORT is not defined");
if (!process.env.DEFAULT_IMAGE) throw new Error("DEFAULT_IMAGE is not defined");
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
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
