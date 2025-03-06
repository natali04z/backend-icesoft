import { Router } from "express";
import { check } from "express-validator";
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from "../controllers/customer.controller.js";
import { authenticateUser, authorizePermission } from "../middlewares/auth.middleware.js";

const router = Router();

const customerValidations = [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("phone").notEmpty().withMessage("Phone is required")
];
router.get("/", authenticateUser, authorizePermission("view_customers"), getCustomers);
router.post("/", authenticateUser, authorizePermission("create_customers"), createCustomer);
router.put("/:id", authenticateUser, authorizePermission("update_customers"), updateCustomer);
router.delete("/:id", authenticateUser, authorizePermission("delete_customers"), deleteCustomer);

export default router;
