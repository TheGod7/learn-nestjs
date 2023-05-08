import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request;
    if (request.isAuthenticated() !== true) {
      request.flash('error', 'Login Error');
    }

    return request.isAuthenticated();
  }
}
