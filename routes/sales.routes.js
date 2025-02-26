const express = require("express");
const { getSales, createSale, updateSale, deleteSale } = require("../controllers/sales.controller");

const router = Router();

router.get("/", getSales); // Get all sales
router.post("/", createSale); // Create a new sale
router.put("/:id", updateSale); // Update a sale
router.delete("/:id", deleteSale); // Delete a sale

module.exports = router;
