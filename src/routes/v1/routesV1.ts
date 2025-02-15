import { Router } from "express";
import { usersRouter } from "./users/users-route";

export const v1Routes = Router();

v1Routes.use("/users", usersRouter);

v1Routes.get("/", (req, res) => {
  res.send("Mkölk API v1");
});
