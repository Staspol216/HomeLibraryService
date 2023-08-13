import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;
  @Column('boolean')
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
