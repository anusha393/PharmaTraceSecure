import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PharmaTraceSecure API",
      version: "1.0.0",
      description: "REST API for PharmaTraceSecure smart contract integration",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Local server",
      },
    ],
  },
  apis: ["./api/routes/*.js"], // <-- scans JSDoc in route files
};

const swaggerSpec = swaggerJsdoc(options);

export const useSwagger = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
