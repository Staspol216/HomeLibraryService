import { Album } from 'src/album/entities/album.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('FavAlbum')
export class FavAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  albumId: string | null;

  @OneToOne(() => Album, (album) => album.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  album: Album;
}
