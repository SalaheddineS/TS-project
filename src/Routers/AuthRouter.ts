import {Router} from "express";
import {login,logout} from "../Controllers/AuthController";
import {Authenticated,NotAuthenticated} from "../../Middlewares/AuthenticatedMiddleware";
const router = Router();

router.post("/login",NotAuthenticated,login);
router.post("/logout",Authenticated,logout);
export default router;