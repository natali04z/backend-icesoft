import mongoose from "mongoose";

// Definir esquema de ventas
const saleSchema = new mongoose.Schema({
  customer: { type: String, required: true }, // Cambié "cliente" por "customer" para que coincida con el controlador
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Ahora referencia a Product
  quantity: { type: Number, required: true }, // Agregado porque el controlador lo usa
  price: { type: Number, required: true },
  totalAmount: { type: Number, required: true }, // Agregado porque el controlador lo usa
  date: { type: Date, default: Date.now }
});

// Evitar duplicación del modelo
const Sale = mongoose.models.Sale || mongoose.model("Sale", saleSchema);

export default Sale;
