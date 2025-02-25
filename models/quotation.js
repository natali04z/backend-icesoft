import mongoose from "mongoose";

const QuotationSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  products: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  date: { type: Date, default: Date.now },
});

//  Exportación correcta
const Quotation = mongoose.model("Quotation", QuotationSchema);
export default Quotation;
