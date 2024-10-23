import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { Artist } from './entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Artist]), FavoriteModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
