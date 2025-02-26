import express, { json } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";

import salesRoutes from './routes/sales.routes.js'
import customerRoutes from "./routes/customer.routes.js";
import quotationRoutes from "./routes/quotation.routes.js";
import reportsRoutes from "./routes/reports.routes.js";





const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
dbConnect();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/api/sales", salesRoutes);
app.use("/api/customers", customerRoutes)
app.use("/api/quotations", quotationRoutes);
app.use("/api/reports", reportsRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});