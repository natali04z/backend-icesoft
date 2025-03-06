import { Router } from "express";
import { check } from "express-validator";
import { getQuotations, createQuotation, updateQuotation, deleteQuotation } from "../controllers/quotation.controller.js";
import { authenticateUser, authorizePermission } from "../middlewares/auth.middleware.js";

const router = Router();

const quotationValidations = [
    check("customer").notEmpty().withMessage("Customer name is required"),
    check("products").isArray({ min: 1 }).withMessage("At least one product is required"),
    check("products.*.name").notEmpty().withMessage("Product name is required"),
    check("products.*.quantity").isInt({ min: 1 }).withMessage("Product quantity must be at least 1"),
    check("products.*.unitPrice").isFloat({ min: 0.01 }).withMessage("Product price must be greater than zero")
];

router.get("/", authenticateUser, authorizePermission("view_quotations"), getQuotations); // Obtener todas las cotizaciones
router.post("/", authenticateUser, authorizePermission("create_quotations"), createQuotation); // Crear una cotización
router.put("/:id", authenticateUser, authorizePermission("update_quotations"), updateQuotation); // Actualizar cotización (aprobar/rechazar)
router.delete("/:id", authenticateUser, authorizePermission("delete_quotations"), deleteQuotation); // Eliminar cotización

export default router;
