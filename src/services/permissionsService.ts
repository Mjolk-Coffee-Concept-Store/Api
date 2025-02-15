export class PermissionsService {
  static readonly PERMISSIONS = {
    USERS: {
      CREATE: 1 << 0,
      READ: 1 << 1,
      UPDATE: 1 << 2,
      DELETE: 1 << 3,
    },
    CONSUMABLES: {
      CREATE: 1 << 4,
      READ: 1 << 5,
      UPDATE: 1 << 6,
      DELETE: 1 << 7,
    },
    BRUNCH: {
      CREATE: 1 << 8,
      READ: 1 << 9,
      UPDATE: 1 << 10,
      DELETE: 1 << 11,
    },
    ORDERS: {
      CREATE: 1 << 12,
      READ: 1 << 13,
      UPDATE: 1 << 14,
      DELETE: 1 << 15,
    },
    POSTS: {
      CREATE: 1 << 16,
      READ: 1 << 17,
      UPDATE: 1 << 18,
      DELETE: 1 << 19,
    },
    PARTNERSHIP: {
      READ: 1 << 20,
      DELETE: 1 << 21,
    },
    RECOMMENDATION: {
      READ: 1 << 22,
      DELETE: 1 << 23,
    },
  };

  static readonly ADMIN = Object.values(PermissionsService.PERMISSIONS).reduce(
    (acc, value) =>
      acc | Object.values(value).reduce((acc, value) => acc | value, 0),
    0
  );

  // Employee can do everything except all the actions on users
  static readonly EMPLOYEE =
    this.ADMIN &
    ~this.PERMISSIONS.USERS.CREATE &
    ~this.PERMISSIONS.USERS.READ &
    ~this.PERMISSIONS.USERS.UPDATE &
    ~this.PERMISSIONS.USERS.DELETE;

  public static isAdmin(userPermissions: number): boolean {
    return userPermissions === this.ADMIN;
  }

  public static isEmployee(userPermissions: number): boolean {
    return userPermissions === this.EMPLOYEE;
  }

  public static hasPermission(
    userPermissions: number,
    permission: number
  ): boolean {
    return (userPermissions & permission) === permission;
  }

  public static addPermission(
    userPermissions: number,
    permission: number
  ): number {
    return userPermissions | permission;
  }

  public static removePermission(
    userPermissions: number,
    permission: number
  ): number {
    return userPermissions & ~permission;
  }
}
