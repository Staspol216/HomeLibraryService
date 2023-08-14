import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavAlbum } from './entities/FavAlbum.entity';
import { Repository } from 'typeorm';
import { Album } from 'src/album/entities/album.entity';
import { FavArtist } from './entities/FavArtist.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { FavTrack } from './entities/FavTrack.entity';
import { Track } from 'src/track/entities/track.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavAlbum)
    private favAlbumRepository: Repository<FavAlbum>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(FavArtist)
    private favArtistReposity: Repository<FavArtist>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(FavTrack)
    private favTrackRepository: Repository<FavTrack>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async findAll() {
    const favArtists = await this.favArtistReposity.find({
      relations: {
        artist: true,
      },
    });

    const favAlbums = await this.favAlbumRepository.find({
      relations: {
        album: true,
      },
    });

    const favTracks = await this.favTrackRepository.find({
      relations: {
        track: true,
      },
    });

    return {
      artists: favArtists.map((favArtist) => favArtist.artist),
      albums: favAlbums.map((favAlbum) => favAlbum.album),
      tracks: favTracks.map((favTrack) => favTrack.track),
    };
  }

  async addTrackToFavorites(id: string) {
    const track = await this.trackRepository.findOne({
      where: { id },
    });
    if (!track) {
      throw new UnprocessableEntityException(`Track with id ${id} not found`);
    }

    const newFavTrack = await this.favTrackRepository.create({
      track,
    });

    await this.favTrackRepository.save(newFavTrack);
  }

  async addAlbumToFavorites(id: string) {
    const album = await this.albumRepository.findOne({
      where: { id },
    });
    if (!album) {
      throw new UnprocessableEntityException(`Album with id ${id} not found`);
    }

    const newFavAlbum = await this.favAlbumRepository.create({
      album,
    });

    await this.favAlbumRepository.save(newFavAlbum);
  }

  async addArtistToFavorites(id: string) {
    const artist = await this.artistRepository.findOne({
      where: { id },
    });
    if (!artist) {
      throw new UnprocessableEntityException(`Artist with id ${id} not found`);
    }

    const newFavArtist = await this.favArtistReposity.create({
      artist,
    });

    await this.favArtistReposity.save(newFavArtist);
  }

  async removeArtistFromFav(artistId: string) {
    const favArtist = await this.favArtistReposity.findOne({
      where: { artistId },
    });
    if (!favArtist) {
      throw new NotFoundException('Artist not found in favorites');
    }
    await this.favArtistReposity.delete(favArtist.id);
  }

  async removeAlbumFromFav(albumId: string) {
    const favAlbum = await this.favAlbumRepository.findOne({
      where: { albumId },
    });
    if (!favAlbum) {
      throw new NotFoundException('Album not found in favorites');
    }
    await this.favAlbumRepository.delete(favAlbum.id);
  }

  async removeTrackFromFav(trackId: string) {
    const favArtist = await this.favTrackRepository.findOne({
      where: { trackId },
    });

    if (!favArtist) {
      throw new NotFoundException(`Artist with id ${trackId} not found`);
    }

    await this.favTrackRepository.delete(favArtist.id);
    return 'Deleted';
  }
}
