import express from "express";
import { getPurchases, getPurchaseById, postPurchase, updatePurchase, deletePurchase } from "../controllers/purchase.controller.js";

const router = express.Router(); 

router.get("/", getPurchases);
router.get("/:id", getPurchaseById);
router.post("/", postPurchase);
router.put("/:id", updatePurchase);
router.delete("/:id", deletePurchase);

export default router;
