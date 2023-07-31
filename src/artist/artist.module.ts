import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { FavoriteModule } from 'src/favorite/favorite.module';

@Module({
  imports: [FavoriteModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
