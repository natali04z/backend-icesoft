import { Router } from "express";
import { getProducts, getProductById, postProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { authenticateUser, authorizePermission } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticateUser, authorizePermission("view_products"), getProducts);
router.get("/:id",authenticateUser, authorizePermission("view_products_id"), getProductById);
router.post("/", authenticateUser, authorizePermission("create_products"),postProduct);
router.put("/:id", authenticateUser, authorizePermission("update_products"), updateProduct);
router.delete("/:id", authenticateUser, authorizePermission("delete_products"),deleteProduct);

export default router
