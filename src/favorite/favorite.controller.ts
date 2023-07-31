import { FavoriteService } from './favorite.service';
import {
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Controller,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesResponse } from './interfaces/favorite.interface';
import { StatusCodes } from 'http-status-codes';
import { FavoriteEntities } from 'src/db/db.service';
@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    return this.favoriteService.findAll();
  }

  @Post('track/:uuid')
  @HttpCode(StatusCodes.CREATED)
  async addTrackToFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.addToFavorite(uuid, FavoriteEntities.Tracks);
  }

  @Delete('track/:uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrackFromFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.removeFromFavorite(
      uuid,
      FavoriteEntities.Tracks,
    );
  }

  @Post('artist/:uuid')
  @HttpCode(StatusCodes.CREATED)
  async addArtistToFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.addToFavorite(uuid, FavoriteEntities.Artist);
  }

  @Delete('artist/:uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtistFromFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.removeFromFavorite(
      uuid,
      FavoriteEntities.Artist,
    );
  }

  @Post('album/:uuid')
  @HttpCode(StatusCodes.CREATED)
  async addAlbumToFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.addToFavorite(uuid, FavoriteEntities.Albums);
  }

  @Delete('album/:uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbumFromFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.removeFromFavorite(
      uuid,
      FavoriteEntities.Albums,
    );
  }
}
