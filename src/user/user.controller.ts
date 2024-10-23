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
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserPasswordDto } from './dto';
import { StatusCodes } from 'http-status-codes';
import { IUser } from './interfaces/user.interface';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<IUser[]> {
    return await this.userService.findAll();
  }

  @Get(':uuid')
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<IUser> {
    return await this.userService.getById(uuid);
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<IUser> {
    return await this.userService.create(dto);
  }

  @Put(':uuid')
  async updatePassword(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateUserPasswordDto,
  ): Promise<IUser> {
    const user = await this.userService.updatePassword(dto, uuid);
    return user;
  }

  @Delete(':uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<string> {
    return await this.userService.delete(uuid);
  }
}
