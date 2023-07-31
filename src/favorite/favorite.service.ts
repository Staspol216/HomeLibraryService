import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DB } from 'src/DB/db.service';
import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { Track } from 'src/track/interfaces/track.interface';
import { FavoritesResponse } from './interfaces/favorite.interface';

@Injectable()
export class FavoriteService {
  constructor(private db: DB) {}

  findAll() {
    const result = {} as FavoritesResponse;
    for (const entity in this.db.favorites) {
      console.log(this.db.favorites[entity], 'entity', entity);
      result[entity] = this.db.favorites[entity]
        .map((id: string) => {
          const itemById = this.db[entity].find(
            (item: Album | Artist | Track) => item.id === id,
          );
          if (itemById) return itemById;
        })
        .filter(Boolean);
    }
    return result;
  }

  addTrackToFav(id: string) {
    const hasEntityById = this.db.tracks.find((track) => track.id === id);
    if (!hasEntityById) {
      throw new UnprocessableEntityException(
        `Favorite track with ${id} not found`,
      );
    }
    this.db.favorites.tracks.push(id);
    return 'Track has been added to the favorites';
  }

  removeTrackFromFavorite(id: string) {
    const favTrackIndex = this.db.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );
    if (favTrackIndex === -1) {
      throw new NotFoundException(`Favorite track with ${id} not found`);
    }
    this.db.favorites.tracks.splice(favTrackIndex, 1);
    return `Favorite track with ${id} has been deleted`;
  }

  addAlbumsToFav(id: string) {
    const hasEntityById = this.db.albums.find((album) => album.id === id);
    if (!hasEntityById) {
      throw new UnprocessableEntityException(
        `Favorite album with ${id} not found`,
      );
    }
    this.db.favorites.albums.push(id);
    return 'Album has been added to the favorites';
  }

  removeAlbumFromFavorite(id: string) {
    const favAlbumIndex = this.db.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );
    if (favAlbumIndex === -1) {
      throw new NotFoundException(`Favorite album with ${id} not found`);
    }
    this.db.favorites.albums.splice(favAlbumIndex, 1);
    return `Favorite album with ${id} has been deleted`;
  }

  addArtistToFavorite(id: string) {
    const hasEntityById = this.db.artists.find((artist) => artist.id === id);
    if (!hasEntityById) {
      throw new UnprocessableEntityException(
        `Favorite artist with ${id} not found`,
      );
    }
    this.db.favorites.artists.push(id);
    return 'Artist has been added to the favorites';
  }

  removeArtistFromFavorite(id: string) {
    const favArtistIndex = this.db.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );
    if (favArtistIndex === -1) {
      throw new NotFoundException(`Favorite artist with ${id} not found`);
    }
    this.db.favorites.artists.splice(favArtistIndex, 1);
    return `Favorite artist with ${id} has been deleted`;
  }
}
