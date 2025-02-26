import Quotation from "../models/quotation.js";

// Obtener todas las cotizaciones
export const getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving quotations" });
  }
};

// Crear una nueva cotización
export const createQuotation = async (req, res) => {
  try {
    const { customer, products } = req.body;

    if (!customer || !products.length) {
      return res.status(400).json({ error: "Customer and products are required" });
    }

    const totalPrice = products.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

    const newQuotation = new Quotation({
      customer,
      products,
      totalPrice,
    });

    await newQuotation.save();
    res.status(201).json(newQuotation);
  } catch (error) {
    res.status(500).json({ error: "Error creating quotation" });
  }
};

// Actualizar cotización (por ejemplo, aprobar o rechazar)
export const updateQuotation = async (req, res) => {
  try {
    const updatedQuotation = await Quotation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedQuotation);
  } catch (error) {
    res.status(500).json({ error: "Error updating quotation" });
  }
};

// Eliminar cotización
export const deleteQuotation = async (req, res) => {
  try {
    await Quotation.findByIdAndDelete(req.params.id);
    res.json({ message: "Quotation deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting quotation" });
  }
};
