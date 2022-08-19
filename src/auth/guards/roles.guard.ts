import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../models/roles.models';
import { PayloadToken } from "../models/token.model";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: any = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    // ['admin', 'customer'];
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    // { role: 'admin', sub: 123131 }
    const isAuth = roles.includes(user.role);
    if (!isAuth) {
      throw new UnauthorizedException('Role no accepted')
    }
    return isAuth;
  }
}
