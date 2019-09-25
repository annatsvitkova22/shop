import { Env } from "src/environment/environment";

const fs = require('fs');

export const environmentDev: Env = {
  production: false,
  name: 'development',
  secret: fs.readFileSync('src/secrets/domain.key'),
  refreshTokenSecret: fs.readFileSync('src/secrets/privatekey.key'),
  port: 80,
  tokenLife: 86400,
  refreshTokenLife: 31536000,
};
