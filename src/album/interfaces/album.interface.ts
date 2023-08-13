import { Artist } from 'src/artist/entities/artist.entity';

export interface IAlbum {
  id: string;
  name: string;
  year: number;
  artist: Artist;
}
