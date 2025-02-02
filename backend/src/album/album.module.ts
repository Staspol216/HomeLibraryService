import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { Album } from './entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), FavoriteModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
