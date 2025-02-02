import { Track } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('FavTrack')
export class FavTrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  trackId: string | null;

  @OneToOne(() => Track, (track) => track.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  track: Track;
}
