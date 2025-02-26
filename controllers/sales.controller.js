import Sale from "../models/Sales.js";

// Get all sales
export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving sales" });
  }
};

export const createSale = async (req, res) => {
  try {
    const newSale = new Sale(req.body);
    await newSale.save();
    res.json(newSale);
  } catch (error) {
    res.status(500).json({ error: "Error creating sale" });
  }
};

export const updateSale = async (req, res) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSale);
  } catch (error) {
    res.status(500).json({ error: "Error updating sale" });
  }
};

export const deleteSale = async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.json({ message: "Sale deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting sale" });
  }
};
