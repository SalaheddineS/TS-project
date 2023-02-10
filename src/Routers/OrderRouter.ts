import { Router } from "express";
import Order from "../Controllers/OrderController";
import Verification from "../../Middlewares/RoleMiddleware";
const router = Router();

router.post("/create", Verification.UserVerify, Order.createOrder);
router.get("/view", Verification.AdminVerify, Order.getOrders);
router.get("/view/:id", Verification.UserVerify||Verification.AdminVerify, Order.getOrder);


export default router;