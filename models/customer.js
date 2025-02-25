import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
