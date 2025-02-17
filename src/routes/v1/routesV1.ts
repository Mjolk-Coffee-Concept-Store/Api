import e, { Router } from "express";
import { usersRouter } from "./users/users-route";
import { consumablesRouter } from "./consumables/consumables-route";
import { recommendationsRouter } from "./recommendations/recommendations-route";
import { brunchsRouter } from "./brunchs/brunchs-route";
import { ordersRouter } from "./orders/orders-route";
import { AppDataSource } from "../../data-source";
import { Log } from "../../entities/Log";

export const v1Routes = Router();

v1Routes.use("/users", usersRouter);
v1Routes.use("/consumables", consumablesRouter);
v1Routes.use("/recommendations", recommendationsRouter);
v1Routes.use("/brunchs", brunchsRouter);
v1Routes.use("/orders", ordersRouter);

v1Routes.get("/", (req, res) => {
  // #swagger.tags = ['API']
  // #swagger.summary = 'API v1'

  res.send("Mkölk API v1");
});

v1Routes.get("/explode", (req, res) => {
  // #swagger.tags = ['API']
  // #swagger.summary = 'API v1'

  throw new Error("💥 Kaboom!");
});

v1Routes.get("/health", async (req, res) => {
  // #swagger.tags = ['API']
  // #swagger.summary = 'API health'

  const logs = await AppDataSource.getRepository(Log).find();
  // Get the proportion of logs.level = "ERROR" in the last week
  const errorLogs = logs.filter(
    (log) =>
      log.level === "ERROR" &&
      log.created_at > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );

  res.json({
    status: "UP",
    health: errorLogs.length < 10 ? "GOOD" : "BAD",
    errors: errorLogs.length,
  });
});
