const Sale = require("../models/Sales");

// Get all sales
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving sales" });
  }
};

// Create a new sale
const createSale = async (req, res) => {
  try {
    const newSale = new Sale(req.body);
    await newSale.save();
    res.json(newSale);
  } catch (error) {
    res.status(500).json({ error: "Error creating sale" });
  }
};

// Update a sale
const updateSale = async (req, res) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSale);
  } catch (error) {
    res.status(500).json({ error: "Error updating sale" });
  }
};

// Delete a sale
const deleteSale = async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.json({ message: "Sale deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting sale" });
  }
};

module.exports = { getSales, createSale, updateSale, deleteSale };
