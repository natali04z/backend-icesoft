import Sale from "../models/sales.js";
import Product from "../models/product.js";
import mongoose from "mongoose";

//  Obtener todas las ventas
export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate("product", "name price");
    res.json(sales);
  } catch (error) {
    console.error("Error retrieving sales:", error);
    res.status(500).json({ error: "Error retrieving sales", details: error.message });
  }
};

//  Crear una nueva venta
export const createSale = async (req, res) => {
  try {
    const { customer, product, quantity, price, totalAmount } = req.body;

    //  Validar que todos los campos requeridos estén presentes
    if (!customer || !product || !quantity || !price || !totalAmount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(product)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be greater than zero" });
    }

    if (existingProduct.stock < quantity) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    //  Reducir stock del producto
    existingProduct.stock -= quantity;
    await existingProduct.save();

    //  Guardar la venta en la base de datos
    const newSale = new Sale({ customer, product, quantity, price, totalAmount });
    await newSale.save();

    res.status(201).json(newSale);
  } catch (error) {
    console.error("Error creating sale:", error);
    res.status(500).json({ error: "Error creating sale", details: error.message });
  }
};

//  Actualizar una venta
export const updateSale = async (req, res) => {
  try {
    const { product, quantity, totalAmount } = req.body;
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({ error: "Sale not found" });
    }

    let stockDifference = 0;

    // Manejo de cambios en cantidad
    if (quantity && quantity !== sale.quantity) {
      const existingProduct = await Product.findById(sale.product);

      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      stockDifference = quantity - sale.quantity;

      if (stockDifference > 0 && existingProduct.stock < stockDifference) {
        return res.status(400).json({ error: "Not enough stock available" });
      }

      existingProduct.stock -= stockDifference;
      await existingProduct.save();
    }

    //  Manejo de cambios en producto
    if (product && product !== sale.product.toString()) {
      if (!mongoose.Types.ObjectId.isValid(product)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const newProduct = await Product.findById(product);
      if (!newProduct) {
        return res.status(404).json({ error: "New product not found" });
      }

      const oldProduct = await Product.findById(sale.product);
      if (oldProduct) {
        oldProduct.stock += sale.quantity;
        await oldProduct.save();
      }

      if (newProduct.stock < quantity) {
        return res.status(400).json({ error: "Not enough stock in new product" });
      }

      newProduct.stock -= quantity;
      await newProduct.save();
    }

    // Actualizar la venta
    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      { product, quantity, totalAmount },
      { new: true }
    ).populate("product", "name price");

    res.json(updatedSale);
  } catch (error) {
    console.error("Error updating sale:", error);
    res.status(500).json({ error: "Error updating sale", details: error.message });
  }
};

// Eliminar una venta
export const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: "Sale not found" });
    }

    //  Devolver el stock al producto
    const product = await Product.findById(sale.product);
    if (product) {
      product.stock += sale.quantity;
      await product.save();
    }

    //  Eliminar la venta de la base de datos
    await Sale.findByIdAndDelete(req.params.id);
    res.json({ message: "Sale deleted and stock updated" });
  } catch (error) {
    console.error("Error deleting sale:", error);
    res.status(500).json({ error: "Error deleting sale", details: error.message });
  }
};
