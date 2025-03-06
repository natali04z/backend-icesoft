import { Router } from "express";
import { check } from "express-validator";
import { getSales, createSale, updateSale, deleteSale } from "../controllers/sales.controller.js";

const router = Router();

const saleValidations = [
    check("customer").notEmpty().withMessage("Customer name is required"),
    check("product").notEmpty().withMessage("Product name is required"),
    check("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    check("price").isFloat({ min: 0.01 }).withMessage("Price must be greater than zero")
];

router.get("/", getSales); // Obtener todas las ventas
router.post("/", createSale); // Crear una venta
router.put("/:id", updateSale); // Actualizar una venta
router.delete("/:id", deleteSale); // Eliminar una venta

export default router; 
