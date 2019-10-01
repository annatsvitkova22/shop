import { Enviroment } from "src/environment/environment";

const fs = require('fs');

export const environmentDev: Enviroment = {
  production: false,
  name: 'development',
  tokenSecret: fs.readFileSync('src/secrets/domain.key'),
  port: 80,
  tokenLife: 86400,
  refreshTokenLife: 31536000,
};
