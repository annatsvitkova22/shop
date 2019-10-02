import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const fs = require('fs');
  const express = require('express');
  const http = require('http');
  const https = require('https');

  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  const options = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('The shop API description')
    .setVersion('1.0')
    .setSchemes('https')
    .addBearerAuth('Authorization', 'header', 'basic')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  
  SwaggerModule.setup('api', app, document);

  const httpsOptions = {
    key: fs.readFileSync('src/secrets/privatekey.key'),
    cert: fs.readFileSync('src/secrets/certificate.crt'),
  };

  //app.useGlobalFilters(new AllExceptionsFilter());
  //app.use(RequestMiddleware);
  app.enableCors();
  await app.init();

  https.createServer(httpsOptions, server).listen(443);

  let http_server = http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  }).listen(80);

}
bootstrap();
