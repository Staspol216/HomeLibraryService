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
@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  findAll(): FavoritesResponse {
    return this.favoriteService.findAll();
  }

  @Post('track/:uuid')
  @HttpCode(201)
  addTrackToFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.addTrackToFav(uuid);
  }

  @Delete('track/:uuid')
  @HttpCode(204)
  removeTrackFromFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.removeTrackFromFavorite(uuid);
  }

  @Post('artist/:uuid')
  @HttpCode(201)
  addArtistToFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.addArtistToFavorite(uuid);
  }

  @Delete('artist/:uuid')
  @HttpCode(204)
  removeArtistFromFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.removeArtistFromFavorite(uuid);
  }

  @Post('album/:uuid')
  @HttpCode(201)
  addAlbumToFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.addAlbumsToFav(uuid);
  }

  @Delete('album/:uuid')
  @HttpCode(204)
  removeAlbumFromFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.removeAlbumFromFavorite(uuid);
  }
}
