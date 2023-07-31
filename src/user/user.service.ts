import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserWithoutPassword } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserPasswordDto, UserDto } from './dto';
import { DB } from 'src/db/db.service';

@Injectable({})
export class UserService {
  constructor(private db: DB) {}
  findAll(): User[] {
    return this.db.users;
  }

  getById(id: string): UserWithoutPassword {
    const userIndex = this.db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const user = this.db.users[userIndex];
    const { password, ...rest } = user;
    return rest;
  }

  create(dto: CreateUserDto): UserWithoutPassword {
    const newUser = new UserDto(dto);
    this.db.users.push(newUser);
    const { password, ...rest } = newUser;
    return rest;
  }

  update(dto: UpdateUserPasswordDto, id: string): UserWithoutPassword {
    const userIndex = this.db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const user = this.db.users[userIndex];
    if (dto.oldPassword !== user.password) {
      throw new ForbiddenException('Incorrect exist password');
    }
    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = new Date().getTime();
    const { password, ...rest } = user;
    return rest;
  }

  delete(id: string) {
    const userIndex = this.db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.db.users.splice(userIndex, 1);
    return '';
  }
}
