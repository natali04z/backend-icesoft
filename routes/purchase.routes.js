import { Router } from "express";
import { getPurchases, getPurchaseById, postPurchase, updatePurchase, deletePurchase } from "../controllers/purchase.controller.js";
import { authenticateUser, authorizePermission } from "../middlewares/auth.middleware.js";

const router = Router(); 

router.get("/", authenticateUser, authorizePermission("view_purchases"),getPurchases);
router.get("/:id", authenticateUser, authorizePermission("view_purchases"), getPurchaseById);
router.post("/", authenticateUser, authorizePermission("view_purchases"),postPurchase);
router.put("/:id", authenticateUser, authorizePermission("view_purchases"),updatePurchase);
router.delete("/:id", authenticateUser, authorizePermission("view_purchases"),deletePurchase);

export default router