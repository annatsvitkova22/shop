import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  let fs = require('fs');
  let express = require('express');
  let http = require('http');
  let https = require('https');

  const httpsOptions = {
    key: fs.readFileSync('src/secrets/privatekey.key'),
    cert: fs.readFileSync('src/secrets/certificate.crt'),
  };

  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  app.enableCors();
  await app.init();


  https.createServer(httpsOptions, server).listen(443);

  var http_server = http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  }).listen(80);

}
bootstrap();
