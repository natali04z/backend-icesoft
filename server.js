import express, { json } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";

import salesRoutes from './routes/sales.routes.js'
import customerRoutes from "./routes/customer.routes.js";
import quotationRoutes from "./routes/quotation.routes.js";
import reportsRoutes from "./routes/reports.routes.js";
import branchesRoutes from "./routes/branches.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import providerRoutes from "./routes/provider.routes.js";
import purchaseRoutes from "./routes/purchase.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/sales", salesRoutes);
app.use("/api/customers", customerRoutes)
app.use("/api/quotations", quotationRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/branches",branchesRoutes);

// Start server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});