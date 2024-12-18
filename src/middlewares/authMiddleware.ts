import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export interface AuthRequest extends Request {
  user?: { Id_User: string; permissions: number };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token manquant ou non valide" });
  }

  try {
    const decoded = jwt.verify(token, ENV.APP_JWT_SECRET as string) as {
      Id_User: string;
      permissions: number;
    };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Accès non autorisé" });
  }
};
