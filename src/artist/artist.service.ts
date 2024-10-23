import { Injectable, NotFoundException } from '@nestjs/common';
import { DB, FavoriteEntities } from 'src/db/db.service';
import { UpdateArtistDto, CreateArtistDto, ArtistDto } from './dto';
import { FavoriteService } from 'src/favorite/favorite.service';

@Injectable()
export class ArtistService {
  constructor(private db: DB, private favoriteService: FavoriteService) {}
  findAll() {
    return this.db.artists;
  }
  getById(id: string) {
    const artistIndex = this.db.artists.findIndex((track) => track.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    const artist = this.db.artists[artistIndex];
    return artist;
  }
  create(dto: CreateArtistDto) {
    const artist = new ArtistDto(dto);
    this.db.artists.push(artist);
    return artist;
  }

  update(dto: UpdateArtistDto, id: string) {
    const artistIndex = this.db.artists.findIndex((track) => track.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    const targetArtist = this.db.artists[artistIndex];
    const updatedArtist = {
      ...targetArtist,
      ...dto,
    };
    this.db.artists.splice(artistIndex, 1, updatedArtist);
    return updatedArtist;
  }

  delete(id: string) {
    const artistIndex = this.db.artists.findIndex((artist) => artist.id === id);
    const targetArtist = this.db.artists[artistIndex];
    this.favoriteService.removeIdByDeleting(id, FavoriteEntities.Artist);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    this.db.artists.splice(artistIndex, 1);
    this.db.albums.forEach((album) => {
      if (album.artistId === targetArtist.id) {
        album.artistId = null;
      }
    });
    this.db.tracks.forEach((track) => {
      if (track.artistId === targetArtist.id) {
        track.artistId = null;
      }
    });
    return `Artist with id ${id} has been deleted`;
  }
}
