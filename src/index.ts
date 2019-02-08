import { TinverServer } from './server/tinver-server';
import { ConfigurationService } from './services/configuration/configuration.service';

const conf = ConfigurationService.getConfiguration();

new TinverServer(conf).serve();
