import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserPasswordDto, UserDto } from './dto';
import { DB } from 'src/db/db.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable({})
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<User>,
    private db: DB,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  getById(id: string): UserDto {
    const userIndex = this.db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const user = this.db.users[userIndex];
    return user;
  }

  create(dto: CreateUserDto): UserDto {
    const newUser = new UserDto(dto);
    this.db.users.push(newUser);
    return newUser;
  }

  update(dto: UpdateUserPasswordDto, id: string): UserDto {
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
    return user;
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
