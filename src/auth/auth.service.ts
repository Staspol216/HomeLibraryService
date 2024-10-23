import { ForbiddenException, Injectable } from '@nestjs/common';
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

    const tokens = await this.getTokens(user.id, user.login);

    await this.userService.update(user.id, {
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  async signup(signUpDto: CreateUserDto) {
    const newUser = await this.userService.create(signUpDto);

    const { refreshToken } = await this.getTokens(newUser.id, newUser.login);

    await this.userService.update(newUser.id, {
      refreshToken,
    });

    return newUser;
  }

  async refresh(refreshToken: string) {
    const payload = await this.verifyToken(refreshToken);

    const user = await this.userService.getById(payload.userId);
    if (refreshToken !== user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.getTokens(payload.userId, payload.login);
    this.userService.update(payload.userId, {
      refreshToken: tokens.refreshToken,
    });
    return tokens;
  }

  async verifyToken(refreshToken) {
    try {
      return await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async getTokens(userId: string, login: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: '1h',
        },
      ),
      this.jwtService.signAsync(
        {
          userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(login: string, password: string): Promise<IUser | null> {
    const user = await this.userService.findByLogin(login);
    if (!user) return null;
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) return null;
    return user;
  }
}
