import express from "express";
import dotenv from "dotenv";
import batchRoutes from "./api/routes/batch.js";
import logRoutes from "./api/routes/log.js";
import { useSwagger } from "./swagger.js";

// Allows self-signed certificates (for local testing only)
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(express.json());

// API Routes
app.use("/api/batch", batchRoutes);
app.use("/api/log", logRoutes);

// Swagger Documentation
useSwagger(app);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
