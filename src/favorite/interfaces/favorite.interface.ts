import { IAlbum } from 'src/album/interfaces/album.interface';
import { IArtist } from 'src/artist/interfaces/artist.interface';
import { ITrack } from 'src/track/interfaces/track.interface';
import { Column } from 'typeorm';

export class Favorites {
  @Column('array')
  artists: string[];
  @Column('array')
  albums: string[];
  @Column('arr')
  tracks: string[];
}

export interface FavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
