import { FavoriteService } from './favorite.service';
import {
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Controller,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { FavoritesResponse } from './interfaces/favorite.interface';
import { StatusCodes } from 'http-status-codes';

@UseInterceptors(ClassSerializerInterceptor)
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
    return this.favoriteService.addTrackToFavorites(uuid);
  }

  @Delete('track/:uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrackFromFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.removeTrackFromFav(uuid);
  }

  @Post('artist/:uuid')
  @HttpCode(StatusCodes.CREATED)
  async addArtistToFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.addArtistToFavorites(uuid);
  }

  @Delete('artist/:uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtistFromFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.removeArtistFromFav(uuid);
  }

  @Post('album/:uuid')
  @HttpCode(StatusCodes.CREATED)
  async addAlbumToFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.addAlbumToFavorites(uuid);
  }

  @Delete('album/:uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbumFromFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.removeAlbumFromFav(uuid);
  }
}
