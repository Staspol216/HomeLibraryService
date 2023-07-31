import { Injectable, NotFoundException } from '@nestjs/common';
import { DB } from 'src/db/db.service';
import { Track } from './interfaces/track.interface';
import { CreateTrackDto, TrackDto } from './dto';

@Injectable()
export class TrackService {
  constructor(private db: DB) {}
  findAll() {
    return this.db.tracks;
  }
  getById(id: string) {
    const trackIndex = this.db.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    const track = this.db.tracks[trackIndex];
    return track;
  }
  create(dto: CreateTrackDto) {
    const track = new TrackDto(dto);
    this.db.tracks.push(track);
    return track;
  }

  update(dto: Partial<Track>, id: string) {
    const trackIndex = this.db.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    const targetTrack = this.db.tracks[trackIndex];
    const updatedTrack = {
      ...targetTrack,
      ...dto,
    };
    this.db.tracks.splice(trackIndex, 1, updatedTrack);
    return updatedTrack;
  }

  delete(id: string) {
    const trackIndex = this.db.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    this.db.tracks.splice(trackIndex, 1);
    return `Track with id ${id} has been deleted`;
  }
}
