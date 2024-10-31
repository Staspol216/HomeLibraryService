import {
  ClassSerializerInterceptor,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
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

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const { password, login } = createUserDto;
    const user = await this.findByLogin(login);
    if (user) {
      throw new ConflictException('Username already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ login, password: hashedPassword });
    return this.userRepository.save(newUser);
  }
  // Здесь не хватает дополнительной проверки и возврат типизированной ошибки про то что - Пользователь с таким login уже зарегистрирован

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.save({
      id,
      ...updateUserDto,
    });
  }
  // updateUserDto нужно типизировать типом/интерфейсом или классом dto
  // update сейчас используется только для обновления токена, но в принципе логика может быть расширена

  async delete(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return 'Deleted';
    // здесь мы даем удалить пользователя по идентификатору, т.е. пользователь может удалить любого пользователя
    // это не совсем безопасно, возможно такая проверка есть на фронте, но можно и здесь тоже добавить проверку
    // например брать идентификатор данного юзера из контекста/запроса(из авторизации) и проверять его на разрешенность
  }
}
