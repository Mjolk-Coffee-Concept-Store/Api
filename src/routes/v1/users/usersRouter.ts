import { Router } from "express";
import { login } from "./users";

export const usersRouter = Router();

usersRouter.post("/login", login);
usersRouter.post("/register", login);
