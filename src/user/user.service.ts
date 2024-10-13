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
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Logger } from 'src/logger/logger.service';
@UseInterceptors(ClassSerializerInterceptor)
@Injectable({})
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private logger: Logger,
  ) {
    this.logger.setContext('UserService');
  }

  async findAll(): Promise<IUser[]> {
    this.logger.log('Doing something...');
    this.logger.customLog();
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

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const { password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ ...createUserDto, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async updatePassword(dto: UpdateUserPasswordDto, id: string): Promise<IUser> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const isEqual = await bcrypt.compare(dto.oldPassword, user.password);

    if (!isEqual) {
      throw new ForbiddenException('Incorrect exist password');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.newPassword, salt);

    const updatedUser = await this.userRepository.save({
      ...user,
      password: hashedPassword,
      version: user.version + 1,
    });
    return new User(updatedUser);
  }

  async update(id: string, updateUserDto: any) {
    return this.userRepository.save({
      id,
      ...updateUserDto,
    });
  }

  async delete(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return 'Deleted';
  }
}
