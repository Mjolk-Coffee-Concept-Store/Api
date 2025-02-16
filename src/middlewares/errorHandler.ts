import { NextFunction, Request, Response } from "express";
import Logger from "../services/logger";

/** Internal ErrorHandle Middleware */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  Logger.getInstance().log("ERROR", "SYSTEM", err.message, err.stack);
  res.status(500).json({ message: "Internal Server Error" });
}
