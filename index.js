import express from "express";
import dotenv from "dotenv";
import batchRoutes from "./api/routes/batch.js";
import { useSwagger } from "./swagger.js";

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/batch", batchRoutes);

// Swagger
useSwagger(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` API running on http://localhost:${PORT}`);
});
