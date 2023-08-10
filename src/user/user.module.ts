import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DBModule } from 'src/db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DBModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
