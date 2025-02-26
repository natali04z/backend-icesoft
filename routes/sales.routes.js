import { Router } from "express";
import { getSales, createSale, updateSale, deleteSale } from "../controllers/sales.controller.js";

const router = Router();

router.get("/", getSales); // Obtener todas las ventas
router.post("/", createSale); // Crear una venta
router.put("/:id", updateSale); // Actualizar una venta
router.delete("/:id", deleteSale); // Eliminar una venta

export default router; 
