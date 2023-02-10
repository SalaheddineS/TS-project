import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  deleteUserByEmail,
} from "../Controllers/UserController";
import Verification from "../../Middlewares/RoleMiddleware";
const router = Router();

// Only Admins can access these routes
router.get("/getUsers", Verification.AdminVerify, getUsers);
router.get(
  "/getUser/:id",
  Verification.AdminVerify || Verification.UserVerify,
  getUser
);
router.post("/createUser", createUser);
router.put(
  "/updateUser/:id",
  Verification.AdminVerify || Verification.UserVerify,
  updateUser
);
router.delete("/deleteUser/:id", Verification.AdminVerify, deleteUser);
router.delete(
  "/deleteUserByEmail/:email",
  Verification.AdminVerify,
  deleteUserByEmail
);

export default router;
