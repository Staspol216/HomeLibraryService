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
import { Roles } from './roles/roles.decorator';
import { UserRoles } from './roles/roles.eum';
import { RolesGuard } from './roles/roles.guard';

@UseGuards(RolesGuard, AbilityGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles(UserRoles.Admin)
  @CheckAbilities(new ReadUserAbilityHandler())
  async findAll(): Promise<IUser[]> {
    return await this.userService.findAll();
  }

  @Get(':uuid')
  @Roles(UserRoles.Admin)
  @CheckAbilities(new ReadUserAbilityHandler())
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<IUser> {
    return await this.userService.getById(uuid);
  }

  @Post()
  @Roles(UserRoles.Admin)
  @CheckAbilities(new CreateUserAbilityHandler())
  async create(@Body() dto: CreateUserDto): Promise<IUser> {
    return await this.userService.create(dto);
  }

  @Put(':uuid')
  @Roles(UserRoles.Admin)
  @CheckAbilities(new UpdateUserAbilityHandler())
  async updatePassword(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateUserPasswordDto,
  ): Promise<IUser> {
    const user = await this.userService.updatePassword(dto, uuid);
    return user;
  }

  @Delete(':uuid')
  @Roles(UserRoles.Admin, UserRoles.Client)
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(
    @Req() request: any,
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<string> {
    const user = await this.userService.getById(request.user.id);
    return await this.userService.delete(uuid, user);
  }
}
