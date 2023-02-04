import {Router} from "express";
import {login,logout,VerifyToken} from "../Controllers/AuthController";
const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", VerifyToken);
export default router;