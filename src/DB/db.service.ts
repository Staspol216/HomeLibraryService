import { IAlbum } from 'src/album/interfaces/album.interface';
import { IArtist } from 'src/artist/interfaces/artist.interface';
import { ITrack } from 'src/track/interfaces/track.interface';
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
  tracks: ITrack[] = [];
  artists: IArtist[] = [];
  albums: IAlbum[] = [];
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
