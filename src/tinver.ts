import { TinverServer } from "./server/server";
let port = 8080;
let uri = "/*";

const getParameters = (argv: string[]): { port: number, uri: string } => {
  let i;
  for (i = 0; i < argv.length; i++) {
    if (argv[i] === "--port" || argv[i] === "-p" && i + 1 < argv.length) {
      port = parseInt(argv[i + 1], 10);
    } else if (argv[i] === "--uri" || argv[i] === "-u" && i + 1 < argv.length) {
      uri = argv[i + 1];
    }
  }

  return { port, uri };
};

const parameters = getParameters(process.argv);

TinverServer.serve(parameters.port, parameters.uri);
