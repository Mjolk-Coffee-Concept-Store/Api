import { Repository } from "typeorm";
import { AppDataSource } from "./data-source";
import { Log } from "./entities/Log";

enum LogLevels {
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

enum LogCategories {
  SYSTEM,
  DATABASE,
  BlOG,
  RESERVATION,
  BRUNCH,
}

type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | LogLevels;
type LogCategory =
  | "SYSTEM"
  | "DATABASE"
  | "BlOG"
  | "RESERVATION"
  | "BRUNCH"
  | LogCategories;

export default class Logger {
  private static instance: Logger;
  private static logRepository: Repository<Log>;
  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
      this.logRepository = AppDataSource.getRepository(Log);
    }
    return Logger.instance;
  }

  log(
    level: LogLevel,
    category: LogCategory,
    short_msg: string,
    long_msg?: string,
    user_id?: string
  ) {
    const _level = typeof level === "string" ? level : LogLevels[level];
    const _category =
      typeof category === "string" ? category : LogCategories[category];

    const log = new Log();
    log.level = _level;
    log.category = _category;
    log.short_msg = short_msg;
    log.long_msg = long_msg;
    log.user_id = user_id;
    log.created_at = new Date();
    Logger.logRepository.save(log);
  }
}
