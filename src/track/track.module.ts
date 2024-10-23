import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { FavoriteModule } from 'src/favorite/favorite.module';

@Module({
  imports: [FavoriteModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
