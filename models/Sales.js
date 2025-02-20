const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sales", SaleSchema);

