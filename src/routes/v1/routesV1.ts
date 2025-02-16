import { Router } from "express";
import { usersRouter } from "./users/users-route";
import { recommendationsRouter } from "./recommendations/recommendations-route";
import { authMiddleware } from "../../middlewares/authMiddleware";

export const v1Routes = Router();

v1Routes.use("/users", usersRouter);
v1Routes.use("/recommendations", authMiddleware, recommendationsRouter);

v1Routes.get("/", (req, res) => {
  res.send("Mkölk API v1");
});
