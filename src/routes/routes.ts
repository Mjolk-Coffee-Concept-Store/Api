import { Router } from "express";

import { v1Routes } from "./v1/routesV1";
import { ENV } from "../config/env";

export const routes = Router();

routes.use("/v1", v1Routes);

routes.get("/", (req, res) => {
  res.send("Welcome to Mjölk API");
});

routes.get("/health", (req, res) => {
  res.send("API is healthy");
});

routes.get("/version", (req, res) => {
  res.send(`API version: ${ENV.APP_VERSION}`);
});

routes.get("*", (req, res) => {
  res.status(404).send("Not Found");
});
