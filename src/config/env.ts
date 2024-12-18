import * as dotenv from "dotenv";

dotenv.config();

export const ENV = {
  APP_NAME: process.env.APP_NAME || "Api",
  APP_ENV: process.env.APP_ENV || "dev",
  APP_VERSION: process.env.APP_VERSION || "1.0.0",
  APP_DEBUG: process.env.APP_DEBUG === "true",
  APP_PORT: process.env.APP_PORT || 3000,
  APP_JWT_SECRET: process.env.APP_JWT_SECRET,

  DB_TYPE: process.env.DB_TYPE || "postgres",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT || "5432"),
  DB_USERNAME: process.env.DB_USERNAME || "test",
  DB_PASSWORD: process.env.DB_PASSWORD || "test",
  DB_DATABASE: process.env.DB_DATABASE || "test",
};
