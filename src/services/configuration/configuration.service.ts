import winston = require('winston');
import { LoggerService } from '../logger.service';
import { Configuration } from './configuration';

export class ConfigurationService {

  private static logger: winston.Logger = LoggerService.getLogger();

  public static getConfiguration = (): Configuration => {
    const conf: Configuration = new Configuration();
    const args = process.argv.slice(2);

    while (args.length > 0) {
      const arg = args.shift();
      switch (arg) {
        case '--port': case '-p':
          conf.port = parseInt(args.shift(), 10);
          break;

        case '--uri': case '-u':
          conf.uri = args.shift();
          break;

        case '--content': case '-c':
          conf.content = args.shift();
          break;

        case '--file': case '-f':
          conf.path = args.shift();
          break;

        case '--silent' || '-s':
          conf.silent = true;
          break;

        default:
          ConfigurationService.logger.warn(`Ignoring unknown argument: ${arg}`);
      }
    }

    return conf;
  }
}