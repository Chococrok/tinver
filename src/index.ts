#!/usr/bin/env node
import { TinverServer } from './server/tinver-server';
import { ConfigurationService } from './services/configuration/configuration.service';

try {
  const conf = ConfigurationService.getConfiguration();

  if (conf) {
    new TinverServer(conf).serve();
  }
} catch (e) {
  process.exit(1);
}
