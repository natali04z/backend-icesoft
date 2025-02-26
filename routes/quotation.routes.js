import { Router } from "express";
import { getQuotations, createQuotation, updateQuotation, deleteQuotation } from "../controllers/quotation.controller.js";

const router = Router();

router.get("/", getQuotations); // Obtener todas las cotizaciones
router.post("/", createQuotation); // Crear una cotización
router.put("/:id", updateQuotation); // Actualizar cotización (aprobar/rechazar)
router.delete("/:id", deleteQuotation); // Eliminar cotización

export default router;
