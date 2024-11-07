import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserPasswordDto } from './dto';
import { StatusCodes } from 'http-status-codes';
import { IUser } from './interfaces/user.interface';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { AbilityGuard } from 'src/ability/ability.guard';
import {
  CreateUserAbilityHandler,
  ReadUserAbilityHandler,
  UpdateUserAbilityHandler,
} from 'src/ability/handlers/user';

@UseGuards(AbilityGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @CheckAbilities(new ReadUserAbilityHandler())
  async findAll(): Promise<IUser[]> {
    return await this.userService.findAll();
  }

  @Get(':uuid')
  @CheckAbilities(new ReadUserAbilityHandler())
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<IUser> {
    return await this.userService.getById(uuid);
  }

  @Post()
  @CheckAbilities(new CreateUserAbilityHandler())
  async create(@Body() dto: CreateUserDto): Promise<IUser> {
    return await this.userService.create(dto);
  }

  @Put(':uuid')
  @CheckAbilities(new UpdateUserAbilityHandler())
  async updatePassword(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateUserPasswordDto,
  ): Promise<IUser> {
    const user = await this.userService.updatePassword(dto, uuid);
    return user;
  }

  @Delete(':uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(
    @Req() request: any,
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<string> {
    const user = await this.userService.getById(request.user.id);
    return await this.userService.delete(uuid, user);
  }
}
