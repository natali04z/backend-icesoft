import express from "express";
import { getSales, createSale, updateSale, deleteSale } from "../controllers/sales.controller.js";

const router = express.Router();

router.get("/", getSales);
router.post("/", createSale);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

export default router;
