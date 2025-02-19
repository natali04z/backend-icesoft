const mongoose = require("mongoose");

const VentaSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ventas", VentaSchema);
