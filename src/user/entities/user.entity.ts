import { Exclude } from 'class-transformer';
import { Entity, Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  login: string;

  @Column('varchar')
  @Exclude()
  password: string;

  @Column({ type: 'int', default: 1 })
  version: number;

  @Column()
  createdAt: number;
  @Column()
  updatedAt: number;
}
