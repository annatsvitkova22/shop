import { Enviroment } from 'src/environment/environment';

const fs = require('fs');

export const environmentDev: Enviroment = {
  production: false,
  name: 'development',
  tokenSecret: fs.readFileSync('src/secrets/domain.key'),
  port: 80,
  tokenLife: 86400,
  refreshTokenLife: 31536000,
  mongoConnection: 'mongodb+srv://Anna:6aYOKYnIED9VFj1c@cluster0-ucmvx.mongodb.net/printing-editions?retryWrites=true&w=majority',
  databaseType: 'mysql',
  databaseHost: '127.0.0.1',
  databasePort: 3306,
  databaseUsername: 'root',
  databasePassword: '1111',
  database: 'new_shop',
  serviceMail: 'gmail',
  portMail: 587,
  secureMail: false,
  userMail: 'tsvitkova.work@gmail.com',
  passMail: 'elofon7302',
  stripeApiKey: 'sk_test_4kwhS3Jsc0uRQZow1C7Q7b6I002UgJ1GHf',
};
