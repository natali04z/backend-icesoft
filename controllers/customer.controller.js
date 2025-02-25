import Customer from "../models/customer.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving customers" });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCustomer = new Customer({ name, email, phone });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: "Error creating customer" });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: "Error updating customer" });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting customer" });
  }
};
