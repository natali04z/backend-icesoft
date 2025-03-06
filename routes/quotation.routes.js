import { Router } from "express";
import { check } from "express-validator";
import { getQuotations, createQuotation, updateQuotation, deleteQuotation } from "../controllers/quotation.controller.js";

const router = Router();

const quotationValidations = [
    check("customer").notEmpty().withMessage("Customer name is required"),
    check("products").isArray({ min: 1 }).withMessage("At least one product is required"),
    check("products.*.name").notEmpty().withMessage("Product name is required"),
    check("products.*.quantity").isInt({ min: 1 }).withMessage("Product quantity must be at least 1"),
    check("products.*.unitPrice").isFloat({ min: 0.01 }).withMessage("Product price must be greater than zero")
];

router.get("/", getQuotations); // Obtener todas las cotizaciones
router.post("/", createQuotation); // Crear una cotización
router.put("/:id", updateQuotation); // Actualizar cotización (aprobar/rechazar)
router.delete("/:id", deleteQuotation); // Eliminar cotización

export default router;
