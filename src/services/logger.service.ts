import * as winston from 'winston';

export abstract class LoggerService {

  private static WINSTON_LOGGER: winston.Logger;

  public static getLogger(): winston.Logger {
    if (!LoggerService.WINSTON_LOGGER) {
      this.configureLogger();
    }

    return LoggerService.WINSTON_LOGGER;
  }

  private static configureLogger() {
    LoggerService.WINSTON_LOGGER = winston.createLogger({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(info => {
          return `${new Date(info.timestamp).toLocaleString()} ${info.level}: ${info.message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
      ],
    });
  }

}
