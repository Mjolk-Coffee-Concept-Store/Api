import { Router } from "express";

import { v1Routes } from "./v1/routesV1";

export const routes = Router();

routes.use("/v1", v1Routes);

routes.get("/", (req, res) => {
  res.send("Welcome to Mjölk API");
});

routes.get("*", (req, res) => {
  res.status(404).send("Not Found");
});
