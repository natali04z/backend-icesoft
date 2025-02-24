import { Router } from "express";
import { getSales, createSale, updateSale, deleteSale } from "../controllers/sales.controller.js";

const router = Router();

router.get("/", getSales); // Get all sales
router.post("/", createSale); // Create a new sale
router.put("/:id", updateSale); // Update a sale
router.delete("/:id", deleteSale); // Delete a sale

export default router;
