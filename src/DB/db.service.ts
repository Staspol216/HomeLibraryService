import { Album } from 'src/album/interfaces/album.interface';
import { IArtist } from 'src/artist/interfaces/artist.interface';
import { Track } from 'src/track/interfaces/track.interface';
import { IUser } from 'src/user/interfaces/user.interface';

export enum FavoriteEntities {
  Users = 'users',
  Artist = 'artists',
  Tracks = 'tracks',
  Albums = 'albums',
}
interface Favorites {
  [FavoriteEntities.Artist]: string[];
  [FavoriteEntities.Albums]: string[];
  [FavoriteEntities.Tracks]: string[];
}

export class DB {
  users: IUser[] = [];
  tracks: Track[] = [];
  artists: IArtist[] = [];
  albums: Album[] = [];
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
