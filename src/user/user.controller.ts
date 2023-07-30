import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserWithoutPassword } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserPasswordDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':uuid')
  async getById(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<UserWithoutPassword> {
    return this.userService.getById(uuid);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateUserPasswordDto,
  ): Promise<UserWithoutPassword> {
    return this.userService.update(dto, uuid);
  }

  @Delete(':uuid')
  @HttpCode(204)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<string> {
    return this.userService.delete(uuid);
  }
}
