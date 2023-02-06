import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductByName,
} from "../Controllers/ProductController";
import { AdminVerify, SellerVerify } from "../../Middlewares/RoleMiddleware";
const router = Router();

router.get("/getProducts", getProducts);
router.get("/getProduct/:id", getProduct);
router.post("/createProduct", SellerVerify, AdminVerify, createProduct);
router.put("/updateProduct/:id", SellerVerify || AdminVerify, updateProduct);
router.delete("/deleteProduct/:id", SellerVerify || AdminVerify, deleteProduct);
router.delete(
  "/deleteProductByName/:name",
  SellerVerify || AdminVerify,
  deleteProductByName
);

export default router;
