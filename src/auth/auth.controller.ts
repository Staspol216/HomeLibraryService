import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto';
import { Public } from './public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshGuard } from './guards/refresh-auth.guard';
import { StatusCodes } from 'http-status-codes';

@Public()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Body() signInDto: CreateUserDto) {
    return this.authService.login(signInDto);
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @UseGuards(RefreshGuard)
  @Post('refresh')
  @HttpCode(StatusCodes.OK)
  async refresh(@Req() req) {
    const refreshToken = req.body?.refreshToken;
    return this.authService.refresh(refreshToken);
  }
}
