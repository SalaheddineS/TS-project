import {Router} from "express";
import  UserVerify  from "../../Middlewares/RoleMiddleware";
import ChattingController from "../Controllers/ChattingController";
const router = Router();

router.get("/test",UserVerify.UserVerify,ChattingController.testingSocket);

export default router;

