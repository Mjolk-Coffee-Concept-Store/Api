import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities/User";
import { ENV } from "../../../config/env";
import { PermissionsService } from "../../../services/permissionsService";
import { authMiddleware } from "../../../middlewares/authMiddleware";
import { SessionsService } from "../../../services/sessionsService";

export const usersRouter = Router();

usersRouter.post("/login", login);
usersRouter.post("/register", register);
usersRouter.get("/whoami", authMiddleware, whoAmI);

async function login(req: Request, res: Response) {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Login with username and password'

  const { username, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.is_active) {
      return res.status(403).json({ message: "User is not active" });
    }

    const token = jwt.sign(
      { Id_User: user.Id_User, permissions: user.permissions },
      ENV.APP_JWT_SECRET as string,
      { expiresIn: ENV.APP_JWT_EXPIRES_IN }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

async function register(req: Request, res: Response) {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Register a new user'

  const { username, password, full_name, role } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);

    const userExists = await userRepository.findOne({ where: { username } });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User();
    user.username = username;
    user.password = await bcrypt.hash(password, 10);
    user.permissions =
      role === "admin" ? PermissionsService.ADMIN : PermissionsService.EMPLOYEE;
    user.full_name = full_name;
    user.is_active = true;

    await userRepository.save(user);

    return res.json({ message: "User created" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

async function whoAmI(req: Request, res: Response) {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get user information from token'

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const user = await SessionsService.getUserFromRequest(token);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove password from user object
    delete user.password;

    return res.json({ user });
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
