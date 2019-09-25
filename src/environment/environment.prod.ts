import { Env } from "./environment";

const fs = require('fs');

export const environmentProd: Env = {
  production: true,
  name: 'production',
  secret: fs.readFileSync('src/secrets/domain.key'),
  refreshTokenSecret: fs.readFileSync('src/secrets/privatekey.key'),
  port: 80,
  tokenLife: 1800,
  refreshTokenLife: 15768000,
};
