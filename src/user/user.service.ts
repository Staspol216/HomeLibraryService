import {
  ClassSerializerInterceptor,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserPasswordDto } from './dto';
import { DB } from 'src/db/db.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
@UseInterceptors(ClassSerializerInterceptor)
@Injectable({})
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private db: DB,
  ) {}

  async findAll(): Promise<IUser[]> {
    return this.userRepository.find();
  }

  async getById(id: string): Promise<IUser> {
    try {
      return await this.userRepository.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async create(dto: CreateUserDto): Promise<IUser> {
    const newUser = new User(dto);
    return await this.userRepository.save(newUser);
  }

  async update(
    dto: UpdateUserPasswordDto,
    id: string,
  ): Promise<Omit<IUser, 'password'>> {
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
    return '';
  }
}
