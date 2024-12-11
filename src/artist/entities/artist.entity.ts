import { Album } from 'src/album/entities/album.entity';
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

  @OneToMany(() => Album, (album) => album.artistId)
  albums: Track[];

  @OneToMany(() => Track, (track) => track.artistId)
  tracks: Track[];

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
