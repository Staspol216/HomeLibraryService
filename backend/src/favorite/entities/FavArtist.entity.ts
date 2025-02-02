import { Artist } from 'src/artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('FavArtist')
export class FavArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  artistId: string | null;

  @OneToOne(() => Artist, (artist) => artist.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  artist: Artist;
}
