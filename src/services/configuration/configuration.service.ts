import * as path from 'path';
import * as winston from 'winston';
import { LoggerService } from '../logger.service';
import { Configuration } from './configuration';

export class ConfigurationService {

  private static logger: winston.Logger = LoggerService.getLogger();

  public static getConfiguration = (): Configuration => {
    const conf: Configuration = new Configuration();
    const helpMsg = 'arguments available: --port, --uri, --content, --file, --silent, --verbose';

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
          const filePath = path.resolve(args.shift());
          conf.path = path.resolve(filePath);
          break;

        case '--silent': case '-s':
          conf.silent = true;
          break;

        case '--verbose': case '-v':
          conf.verbose = true;
          break;

        case '--help': case '-h':
          ConfigurationService.logger.info(helpMsg);
          return undefined;

        default:
          ConfigurationService.logger.error(`Unknown argument: ${arg}`);
          ConfigurationService.logger.error(helpMsg);

          throw new Error();
      }
    }

    return conf;
  }
}
