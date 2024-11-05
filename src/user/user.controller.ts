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
import { Action } from 'src/ability/factory/ability.factory';
import { User } from './entities/user.entity';
import { AbilityGuard } from 'src/ability/ability.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AbilityGuard)
  @CheckAbilities({ action: Action.Read, subject: User })
  async findAll(): Promise<IUser[]> {
    return await this.userService.findAll();
  }

  @UseGuards(AbilityGuard)
  @CheckAbilities({ action: Action.Read, subject: User })
  @Get(':uuid')
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<IUser> {
    return await this.userService.getById(uuid);
  }

  @UseGuards(AbilityGuard)
  @CheckAbilities({ action: Action.Create, subject: User })
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<IUser> {
    return await this.userService.create(dto);
  }

  @UseGuards(AbilityGuard)
  @CheckAbilities({ action: Action.Update, subject: User })
  @Put(':uuid')
  async updatePassword(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateUserPasswordDto,
  ): Promise<IUser> {
    const user = await this.userService.updatePassword(dto, uuid);
    return user;
  }

  @UseGuards(AbilityGuard)
  @CheckAbilities({ action: Action.Delete, subject: User })
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
