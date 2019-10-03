import { Enviroment } from 'src/environment/environment';

const fs = require('fs');

export const environmentProd: Enviroment = {
  production: true,
  name: 'production',
  tokenSecret: fs.readFileSync('src/secrets/domain.key'),
  port: 80,
  tokenLife: 1800,
  refreshTokenLife: 15768000,
};
