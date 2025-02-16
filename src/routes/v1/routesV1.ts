import { Router } from "express";
import { usersRouter } from "./users/users-route";
import { recommendationsRouter } from "./recommendations/recommendations-route";

export const v1Routes = Router();

v1Routes.use("/users", usersRouter);
v1Routes.use("/recommendations", recommendationsRouter);

v1Routes.get("/", (req, res) => {
  res.send("Mkölk API v1");
});
