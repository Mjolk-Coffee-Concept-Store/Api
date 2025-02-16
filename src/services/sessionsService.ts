import jwt from "jsonwebtoken";

import { User } from "../entities/User";
import { ENV } from "../config/env";
import { AppDataSource } from "../data-source";

export class SessionsService {
  private static getUserIdAndPermFromRequest(
    token: string
  ): { Id_User: string; permissions: number } | undefined {
    try {
      const decoded = jwt.verify(token, ENV.APP_JWT_SECRET as string) as {
        Id_User: string;
        permissions: number;
      };

      return decoded;
    } catch (error) {}
  }

  public static getUserIdFromRequest(token: string): string | undefined {
    const decoded = this.getUserIdAndPermFromRequest(token);

    if (decoded) return decoded.Id_User;

    return undefined;
  }

  public static getUserPermissionsFromRequest(
    token: string
  ): number | undefined {
    const decoded = this.getUserIdAndPermFromRequest(token);

    if (decoded) return decoded.permissions;

    return undefined;
  }

  public static getUserFromRequest(token: string): Promise<User> | undefined {
    const userId = this.getUserIdFromRequest(token);

    if (!userId) return undefined;

    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.findOne({ where: { Id_User: userId } });

    return user;
  }
}
