import { Router } from "express";
import { usersRouter } from "./users/usersRouter";

export const v1Routes = Router();

v1Routes.get("/", (req, res) => {
  res.send("Mkölk API v1");
});

v1Routes.get("/users", usersRouter);
