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
  UseGuards,
} from '@nestjs/common';
import { Favorites, FavoritesResponse } from './interfaces/favorite.interface';
import { StatusCodes } from 'http-status-codes';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/factory/ability.factory';
import { FavTrack } from './entities/FavTrack.entity';
import { FavArtist } from './entities/FavArtist.entity';
import { FavAlbum } from './entities/FavAlbum.entity';
import { AbilityGuard } from 'src/ability/ability.guard';

@UseGuards(AbilityGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  @CheckAbilities({ action: Action.Read, subject: Favorites })
  async findAll(): Promise<FavoritesResponse> {
    return this.favoriteService.findAll();
  }

  @Post('track/:uuid')
  @CheckAbilities({ action: Action.Create, subject: FavTrack })
  @HttpCode(StatusCodes.CREATED)
  async addTrackToFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.addTrackToFavorites(uuid);
  }

  @Delete('track/:uuid')
  @CheckAbilities({ action: Action.Delete, subject: FavTrack })
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrackFromFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.removeTrackFromFav(uuid);
  }

  @Post('artist/:uuid')
  @CheckAbilities({ action: Action.Create, subject: FavArtist })
  @HttpCode(StatusCodes.CREATED)
  async addArtistToFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.addArtistToFavorites(uuid);
  }

  @Delete('artist/:uuid')
  @CheckAbilities({ action: Action.Delete, subject: FavArtist })
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtistFromFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.removeArtistFromFav(uuid);
  }

  @Post('album/:uuid')
  @CheckAbilities({ action: Action.Create, subject: FavAlbum })
  @HttpCode(StatusCodes.CREATED)
  async addAlbumToFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.addAlbumToFavorites(uuid);
  }

  @Delete('album/:uuid')
  @CheckAbilities({ action: Action.Delete, subject: FavAlbum })
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbumFromFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.removeAlbumFromFav(uuid);
  }
}
