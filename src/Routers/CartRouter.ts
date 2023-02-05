import {Router} from "express";
import {addToCart,viewCart,viewCarts} from "../Controllers/CartController";
import {UserVerify,AdminVerify} from "../../Middlewares/RoleMiddleware";

const router = Router();

router.post("/add",UserVerify,addToCart);
router.get("/view",UserVerify,viewCart);
router.get("/viewAll",AdminVerify,viewCarts);

export default router;