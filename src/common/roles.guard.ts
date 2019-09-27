import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    if (!roles) {

      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.body;
    console.log(user);
    if( user.role == roles){
      return true;
    }
    //const hasRole = () => user.roles.some((role) => roles.includes(role));
    return false;
  }
}