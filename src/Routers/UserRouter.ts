import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  deleteUserByEmail,
} from "../Controllers/UserController";
import { AdminVerify } from "../../Middlewares/RoleMiddleware";
const router = Router();

// Only Admins can access these routes
router.get("/getUsers", AdminVerify, getUsers);
router.get("/getUser/:id", AdminVerify, getUser);
router.post("/createUser", AdminVerify, createUser);
router.put("/updateUser/:id", AdminVerify, updateUser);
router.delete("/deleteUser/:id", AdminVerify, deleteUser);
router.delete("/deleteUserByEmail/:email", AdminVerify, deleteUserByEmail);

export default router;
