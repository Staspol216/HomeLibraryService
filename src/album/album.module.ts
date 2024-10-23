import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { FavoriteModule } from 'src/favorite/favorite.module';

@Module({
  imports: [FavoriteModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
