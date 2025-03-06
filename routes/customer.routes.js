import { Router } from "express";
import { check } from "express-validator";
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from "../controllers/customer.controller.js";

const router = Router();

const customerValidations = [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("phone").notEmpty().withMessage("Phone is required")
];
router.get("/", getCustomers);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
