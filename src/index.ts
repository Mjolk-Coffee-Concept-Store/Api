import "reflect-metadata";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

import { AppDataSource } from "./data-source";
import Logger from "./services/logger";

import { errorHandler } from "./middlewares/errorHandler";

import { routes } from "./routes/routes";

import { ENV } from "./config/env";

const app = express();
const PORT = ENV.APP_PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);

app.use("/api", routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(PORT, () => {
  console.info(`💽 Mjölk API starting...`);
  AppDataSource.initialize().then(() => {
    console.info(`📡 Database ${ENV.DB_DATABASE} connected`);
    console.info(`🚀 Mjölk API started on address http://localhost:${PORT}`);

    if (ENV.APP_ENV === "prod") {
      console.info(`🔒 Running in production mode`);
      Logger.getInstance().log("INFO", "SYSTEM", "API started");
    }
  });
});
