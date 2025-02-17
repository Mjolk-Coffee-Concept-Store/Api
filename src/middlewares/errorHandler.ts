import { NextFunction, Request, Response } from "express";
import Logger from "../services/logger";
import { ENV } from "../config/env";

/** Internal ErrorHandle Middleware */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  Logger.getInstance().log("ERROR", "SYSTEM", err.message, err.stack);

  if (ENV.APP_ENV === "dev") {
    console.error(err);
  }

  res.status(500).json({ message: "Internal Server Error" });
}
