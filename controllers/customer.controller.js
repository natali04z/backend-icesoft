import { validationResult } from "express-validator";
import Customer from "../models/customer";

// Obtener todos los clientes
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving customers" });
  }
};

// Crear un nuevo cliente (con validaciones de express-validator)
export const createCustomer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, phone } = req.body;
    const newCustomer = new Customer({ name, email, phone });
    await newCustomer.save();

    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: "Error creating customer" });
  }
};

// Actualizar cliente (con validaciones de express-validator)
export const updateCustomer = async (req, res) => {
  const errors = validationResult(req);  // Captura los errores de validación
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: "Error updating customer" });
  }
};

// Eliminar cliente (sin validaciones porque no hay body que revisar)
export const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting customer" });
  }
};
