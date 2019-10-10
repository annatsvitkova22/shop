import { Enviroment } from 'src/environment/environment';

const fs = require('fs');

export const environmentDev: Enviroment = {
  production: false,
  name: 'development',
  tokenSecret: fs.readFileSync('src/secrets/domain.key'),
  port: 80,
  tokenLife: 86400,
  refreshTokenLife: 31536000,
  mongoConnection: 'mongodb+srv://tsvitkova_work:rFI3VAA3eysltGbn@cluster0-mbfra.mongodb.net/nestjs-demo?retryWrites=true&w=majority',
  databaseType: 'mysql',
  databaseHost: '127.0.0.1',
  databasePort: 3306,
  databaseUsername: 'root',
  databasePassword: '1111',
  database: 'book-shop',
};
