import swaggerAutogen from "swagger-autogen";

const API_VERSION = 1;

const doc = {
  info: {
    version: "v1.0.0",
    title: "Mjölk API",
    description: "API for Mjölk",
    contact: {
      name: "Dev Support Team",
      email: "ericphlpp@proton.me",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/v1",
      description: "Development server",
    },
    {
      url: "https://localhost:3000/v1",
      description: "Staging server",
    },
    {
      url: "https://api.mjolk/v1",
      description: "Production server",
    },
  ],
  tags: [
    {
      name: "API",
      description: "API Description",
    },
    {
      name: "Users",
      description: "Operations about Backoffice users",
    },
    {
      name: "Orders",
      description: "Operations about Orders",
    },
    {
      name: "Consumables",
      description: "Operations about Consumables",
    },
    {
      name: "Recommendations",
      description: "Operations about Recommendations",
    },
    {
      name: "Brunchs",
      description: "Operations about Brunchs",
    },
    {
      name: "Brunchs Items",
      description: "Operations about Brunchs Items",
    },
    {
      name: "Brunchs Reservations",
      description: "Operations about Brunchs Reservations",
    },
    {
      name: "Brunchs Reservations Orders",
      description: "Operations about Brunchs Reservations Orders",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:
          "Enter your bearer token in the format **Bearer &lt;token&gt;**",
      },
    },
    schemas: {
      Consumable: {
        name: "string",
        type: "integer",
        description: "string",
        temperature: "string",
        price: "number",
        is_vegetarian: "boolean",
        is_vegan: "boolean",
        availability: "boolean",
        allergens: "string | null",
      },
    },
  },

  security: [
    {
      bearerAuth: [],
    },
  ],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  `./src/routes/v${API_VERSION}/routesV${API_VERSION}.ts`,
];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
