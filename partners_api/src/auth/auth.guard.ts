import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) { }


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const header = context.switchToHttp().getRequest<Request>();
    const token = header.headers['x_auth'];
    if (token === this.configService.get('AUTH_TOKEN')) {
      return true;
    }

    return false;
  }
}
