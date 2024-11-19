import { Exclude, Transform } from 'class-transformer';
import { UserRoles } from 'src/ability/roles/roles.eum';
import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  login: string;

  @Column({ type: 'varchar' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ enum: UserRoles, type: 'enum', default: UserRoles.Client })
  role: UserRoles;

  @Column({ type: 'int', default: 1 })
  version: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Transform(({ value }) => value.getTime())
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Transform(({ value }) => value.getTime())
  updatedAt: Date;

  @Exclude()
  @Column({ nullable: true })
  refreshToken: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
