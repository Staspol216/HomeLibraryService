import { IAlbum } from 'src/album/interfaces/album.interface';
import { IArtist } from 'src/artist/interfaces/artist.interface';
import { ITrack } from 'src/track/interfaces/track.interface';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
