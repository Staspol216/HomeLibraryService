import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string): Promise<any> {
    if (typeof login !== 'string' || typeof password !== 'string') {
      throw new BadRequestException(
        'Login and password should be a string type',
      );
    }
    const user = await this.authService.validateUser(login, password);
    if (!user) throw new ForbiddenException('Incorrect login or password');
    return user;
  }
}
