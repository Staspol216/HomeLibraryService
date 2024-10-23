import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavAlbum } from './entities/FavAlbum.entity';
import { FavTrack } from './entities/FavTrack.entity';
import { FavArtist } from './entities/FavArtist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavAlbum,
      FavTrack,
      FavArtist,
      Track,
      Artist,
      Album,
    ]),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
