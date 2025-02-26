import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

//  Exportación correcta para ES Modules
const Sale = mongoose.model("Sales", SaleSchema);
export default Sale;
