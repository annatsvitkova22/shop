import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const fs = require('fs');
  const express = require('express');
  const http = require('http');
  const https = require('https');

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

  let http_server = http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  }).listen(80);

}
bootstrap();
