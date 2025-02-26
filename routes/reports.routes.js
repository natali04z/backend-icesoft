import { Router } from "express";
import { getSalesReport, getTopCustomers, getTopProducts } from "../controllers/reports.controller.js";

const router = Router();

router.get("/sales", getSalesReport); // Reporte de ventas por fecha
router.get("/top-customers", getTopCustomers); // Clientes con más compras
router.get("/top-products", getTopProducts); // Productos más vendidos

export default router;
