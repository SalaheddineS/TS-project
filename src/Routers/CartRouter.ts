import {Router} from "express";
import {addToCart,viewCart,viewCarts} from "../Controllers/CartController";
import Verification from "../../Middlewares/RoleMiddleware";

const router = Router();

router.post("/add",Verification.UserVerify,addToCart);
router.get("/view",Verification.UserVerify,viewCart);
router.get("/viewAll",Verification.AdminVerify,viewCarts);

export default router;