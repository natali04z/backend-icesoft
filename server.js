const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
dbConnect();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/api/sales", require("./routes/sales.routes"));


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});