import { Track } from 'src/track/entities/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;
  @Column('boolean')
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artistId)
  tracks: Track[];

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
