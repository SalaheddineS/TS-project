import { Router } from "express";
import { getUsers, getUser, createUser, updateUser } from "../Controllers/UserController";
const router = Router();


router.get("/getUsers", getUsers);
router.get("/getUser/:id", getUser);
router.post("/createUser", createUser);
router.put("/updateUser/:id", updateUser);

export default router;