import "reflect-metadata";
import { DataSource } from "typeorm";
import { ENV } from "./config/env";

const isProduction = ENV.APP_ENV === "prod";

export const AppDataSource = new DataSource({
  type: ENV.DB_TYPE as any,
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_DATABASE,
  synchronize: ENV.APP_DEBUG,
  logging: ENV.APP_DEBUG,
  entities: [isProduction ? "dist/entities/**/*.js" : "src/entities/**/*.ts"],
  migrations: [
    isProduction ? "dist/migrations/*.js" : __dirname + "/migrations/*.ts",
  ],
});
