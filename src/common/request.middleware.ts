import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const url = req.protocol + '://' + req.hostname + req.url;
    const { password, ...user } = req.body;

    next();
  }
}
