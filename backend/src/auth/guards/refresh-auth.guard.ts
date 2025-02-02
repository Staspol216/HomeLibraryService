import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshGuard extends AuthGuard('jwt-refresh') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const { body } = ctx.getRequest();
    const refreshToken = body?.refreshToken;
    if (!refreshToken) throw new UnauthorizedException('jwt must be provided');
    return true;
  }
}
