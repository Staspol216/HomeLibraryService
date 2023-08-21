import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login(signInDto: CreateUserDto) {
    const { login } = signInDto;

    const user = await this.userService.findByLogin(login);

    const payload = { sub: user.id, login: user.login };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }

  async validateUser(login: string, password: string): Promise<IUser | null> {
    const user = await this.userService.findByLogin(login);
    if (!user) return null;
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) return null;
    return user;
  }
}
