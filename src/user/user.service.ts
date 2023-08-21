import {
  ClassSerializerInterceptor,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserPasswordDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
@UseInterceptors(ClassSerializerInterceptor)
@Injectable({})
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<IUser[]> {
    return this.userRepository.find();
  }

  async findByLogin(login: string): Promise<User> {
    return this.userRepository.findOne({ where: { login } });
  }

  async getById(id: string): Promise<IUser> {
    try {
      return await this.userRepository.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async create(dto: CreateUserDto): Promise<IUser> {
    const { login, password } = dto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const registerUserDto = {
      login,
      password: hashedPassword,
    };
    const newUser = new User(registerUserDto);
    return this.userRepository.save(newUser);
  }

  async update(dto: UpdateUserPasswordDto, id: string): Promise<IUser> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (dto.oldPassword !== user.password) {
      throw new ForbiddenException('Incorrect exist password');
    }
    const updatedUser = await this.userRepository.save({
      ...user,
      password: dto.newPassword,
      version: user.version + 1,
    });
    return new User(updatedUser);
  }

  async delete(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return 'Deleted';
  }
}
