import { Router } from "express";

export const v1Routes = Router();

v1Routes.get("/", (req, res) => {
  res.send("Mkölk API v1");
});
