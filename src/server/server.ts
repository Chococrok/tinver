import * as express from "express";
import * as winston from "winston";
import { LoggerService } from "../service/logger.service";

export abstract class TinverServer {

  private static logger = LoggerService.getLogger();
  private static app = express();

  private static logRequest() {
    TinverServer.app.use((req, res, next) => {
      TinverServer.logger.info(`${req.method}: ${req.url}`);
      next();
    });
  }
  public static serve(port: number, uri: string, fileToReturn?: string) {
    TinverServer.logRequest();

    TinverServer.app.post(uri, (req, res) => {
      res.status(200).sendFile("/home/barbaria/dummy/mpu-simu/stwr.mock.xml");
    });

    TinverServer.app.listen(port, "localhost", () => {
      TinverServer.logger.info(`Listening at http://localhost:${port}${uri}`);
    });
  }

}
