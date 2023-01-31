import {Router} from "express";
import {login} from "../Controllers/AuthController";
const router = Router();

router.post("/login", login);

export default router;