const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contact Us API",
      version: "1.0.0",
      description: "API documentation for Contact Us Form",
    },
    servers: [{ url: "http://localhost:3001" }], // URL server
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description:
            'Enter your token with "Bearer " prefix. Example: Bearer eyJhbGciOiJIUzI1...',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./router/*.js"], // Lokasi file route
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

module.exports = setupSwagger;
