import { Router } from "express";
import Products from "../Controllers/ProductController";
import Verification from "../../Middlewares/RoleMiddleware";
const router = Router();

router.get("/getProducts", Products.getProducts);
router.get("/getProduct/:id", Products.getProduct);
router.post(
  "/createProduct",
  Verification.SellerVerify,
  Verification.AdminVerify,
  Products.createProduct
);
router.put(
  "/updateProduct/:id",
  Verification.SellerVerify || Verification.AdminVerify,
  Products.updateProduct
);
router.delete(
  "/deleteProduct/:id",
  Verification.SellerVerify || Verification.AdminVerify,
  Products.deleteProduct
);
router.delete(
  "/deleteProductByName/:name",
  Verification.SellerVerify || Verification.AdminVerify,
  Products.deleteProductByName
);

export default router;
