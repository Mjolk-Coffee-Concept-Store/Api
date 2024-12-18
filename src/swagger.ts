import swaggerAutogen from "swagger-autogen";
import { ENV } from "./config/env";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Mjölk API",
    description: "API for Mjölk",
  },
  servers: [
    {
      url: ENV.APP_URL,
      description: "",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/routes.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
