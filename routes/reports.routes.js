import { Router } from "express";
import { getSalesReport, getTopCustomers, getTopProducts } from "../controllers/reports.controller.js";
import { authenticateUser, authorizePermission } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/sales", authenticateUser, authorizePermission("view_sales_report"), getSalesReport); // Reporte de ventas por fecha
router.get("/top-customers", authenticateUser, authorizePermission("view_top_customers"), getTopCustomers); // Clientes con más compras
router.get("/top-products", authenticateUser, authorizePermission("view_top_products"), getTopProducts); // Productos más vendidos

export default router;
