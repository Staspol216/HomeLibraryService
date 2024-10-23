import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { Track } from './entities/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Track]), FavoriteModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
