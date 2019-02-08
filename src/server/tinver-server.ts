import * as express from 'express';
import { Response } from 'express-serve-static-core';
import * as winston from 'winston';
import { Configuration } from '../services/configuration/configuration';
import { LoggerService } from '../services/logger.service';

export class TinverServer {

  private logger = LoggerService.getLogger();
  private app = express();
  private conf: Configuration;

  constructor(conf: Configuration) {
    this.conf = conf;
  }

  public serve() {
    if (!this.conf.silent) {
      this.enableLogRequest();
    }

    this.app.use(this.conf.uri, (req, res) => {
      this.handleRequest(res);
    });

    this.app.listen(this.conf.port, 'localhost', () => {
      this.logger.info(`Listening at http://localhost:${this.conf.port}${this.conf.uri}`);
    });
  }

  private enableLogRequest() {
    this.app.use((req, res, next) => {
      this.logger.info(`${req.method}: ${req.url}`);
      next();
    });
  }

  private handleRequest(res: Response) {
    if (this.conf.content) {
      res.status(200).send(this.conf.content);
    } else if (this.conf.path) {
      res.status(200).sendFile(this.conf.path);
    } else {
      res.status(200).end();
    }
  }

}