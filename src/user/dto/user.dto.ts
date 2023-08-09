import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class UserDto {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;

  createdAt: number;
  updatedAt: number;

  constructor(dto: Partial<UserDto>) {
    const timestamp = new Date().getTime();
    this.id = uuidv4();
    this.login = dto.login;
    this.password = dto.password;
    this.version = 1;
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
