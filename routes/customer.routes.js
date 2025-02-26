import { Router } from "express";
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from "../controllers/customer.controller.js";

const router = Router();

router.get("/", getCustomers);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
