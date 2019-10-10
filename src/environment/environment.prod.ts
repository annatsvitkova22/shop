import { Enviroment } from 'src/environment/environment';

const fs = require('fs');

export const environmentProd: Enviroment = {
  production: true,
  name: 'production',
  tokenSecret: fs.readFileSync('src/secrets/domain.key'),
  port: 80,
  tokenLife: 1800,
  refreshTokenLife: 15768000,
  mongoConnection: 'mongodb+srv://tsvitkova_work:rFI3VAA3eysltGbn@cluster0-mbfra.mongodb.net/nestjs-demo?retryWrites=true&w=majority',
  databaseType: 'mysql',
  databaseHost: '127.0.0.1',
  databasePort: 3306,
  databaseUsername: 'root',
  databasePassword: '1111',
  database: 'book-shop',
};
