import express, { json } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";

import salesRoutes from './routes/sales.routes.js'

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/api/sales", salesRoutes);


// Start server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
