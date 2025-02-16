import { Router } from "express";
import { usersRouter } from "./users/users-route";
import { consumablesRouter } from "./consumables/consumables-route";
import { recommendationsRouter } from "./recommendations/recommendations-route";
import { brunchsRouter } from "./brunchs/brunchs-route";

export const v1Routes = Router();

v1Routes.use("/users", usersRouter);
v1Routes.use("/consumables", consumablesRouter);
v1Routes.use("/recommendations", recommendationsRouter);
v1Routes.use("/brunchs", brunchsRouter);

v1Routes.get("/", (req, res) => {
  // #swagger.tags = ['API']
  // #swagger.summary = 'API v1'

  res.send("Mkölk API v1");
});
