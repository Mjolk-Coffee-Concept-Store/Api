import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities/User";
import { ENV } from "../../../config/env";

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    if (!user.is_active) {
      return res.status(403).json({ message: "Compte désactivé" });
    }

    const token = jwt.sign(
      { Id_User: user.Id_User, permissions: user.permissions },
      ENV.APP_JWT_SECRET as string,
      { expiresIn: ENV.APP_JWT_EXPIRES_IN }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
}

export async function register(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);

    const user = new User();
    user.username = username;
    user.password = await bcrypt.hash(password, 10);

    await userRepository.save(user);

    return res.json({ message: "Utilisateur créé" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
}
