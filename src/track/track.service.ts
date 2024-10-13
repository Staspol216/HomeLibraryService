import { Injectable, NotFoundException } from '@nestjs/common';
import { ITrack } from './interfaces/track.interface';
import { CreateTrackDto } from './dto';
import { FavoriteService } from 'src/favorite/favorite.service';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}

  async findAll() {
    return await this.trackRepository.find();
  }

  async getById(id: string) {
    try {
      return await this.trackRepository.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
  }

  async create(dto: CreateTrackDto) {
    const newArtist = new Track(dto);
    return await this.trackRepository.save(newArtist);
  }

  async update(dto: Partial<ITrack>, id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    const updatedTrack = await this.trackRepository.save({
      ...track,
      ...dto,
    });
    return new Track(updatedTrack);
  }

  async delete(id: string) {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return 'Deleted';
  }
}
