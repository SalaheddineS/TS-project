import express from "express";
import UserRouter from "../src/Routers/UserRouter";
import AuthRouter from "../src/Routers/AuthRouter";
import ProductRouter from "../src/Routers/ProductRouter";
import CartRouter from "../src/Routers/CartRouter";
import OrderRouter from "../src/Routers/OrderRouter";
import ChattingRouter from "../src/Routers/ChattingRouter";
const mainRouter = express.Router();

mainRouter.use("/users", UserRouter);
mainRouter.use("/auth", AuthRouter);
mainRouter.use("/products", ProductRouter);
mainRouter.use("/cart", CartRouter);
mainRouter.use("/orders", OrderRouter);
mainRouter.use("/chat", ChattingRouter);

export default mainRouter;
