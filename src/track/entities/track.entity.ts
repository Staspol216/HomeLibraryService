// import { Entity } from 'typeorm';

import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('int')
  duration: number;

  @Column({ nullable: true })
  albumId: string | null;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Album, {
    onDelete: 'SET NULL',
  })
  album: Album;

  @ManyToOne(() => Artist, {
    onDelete: 'SET NULL',
  })
  artist: Artist;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
