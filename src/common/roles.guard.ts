import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  public canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    let token = request.headers.authorization;
    token = token.substring(6, token.length).trim();
    const jwt = require('jsonwebtoken');
    const user = jwt.decode(token);
    const hasRole = roles.includes(user.role);

    return hasRole;
  }
}
