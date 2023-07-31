import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DB } from 'src/db/db.service';
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

  addToFavorite(id: string, entity: any) {
    const hasEntityById = this.db[entity].find((item) => item.id === id);
    if (!hasEntityById) {
      throw new UnprocessableEntityException(
        `Favorite ${entity} with ${id} not found`,
      );
    }
    this.db.favorites[entity].push(id);
    return `${entity} has been added to the favorites`;
  }

  removeFromFavorite(id: string, entity: any) {
    const favItemIndex = this.db.favorites[entity].findIndex(
      (itemId: string) => itemId === id,
    );
    if (favItemIndex === -1) {
      throw new NotFoundException(`Favorite ${entity} with ${id} not found`);
    }
    this.db.favorites[entity].splice(favItemIndex, 1);
    return `Favorite ${entity} with ${id} has been deleted`;
  }
}
