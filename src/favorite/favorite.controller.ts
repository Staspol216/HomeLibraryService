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
import { FavoritesResponse } from './interfaces/favorite.interface';
import { StatusCodes } from 'http-status-codes';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { AbilityGuard } from 'src/ability/ability.guard';
import {
  CreateFavAlbumAbilityHandler,
  CreateFavArtistAbilityHandler,
  CreateFavTrackAbilityHandler,
  DeleteFavAlbumAbilityHandler,
  DeleteFavTrackAbilityHandler,
  ReadFavoritesAbilityHandler,
} from 'src/ability/handlers/favorites';
import { RolesGuard } from 'src/user/roles/roles.guard';

@UseGuards(RolesGuard, AbilityGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  @CheckAbilities(new ReadFavoritesAbilityHandler())
  async findAll(): Promise<FavoritesResponse> {
    return this.favoriteService.findAll();
  }

  @Post('track/:uuid')
  @CheckAbilities(new CreateFavTrackAbilityHandler())
  @HttpCode(StatusCodes.CREATED)
  async addTrackToFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.addTrackToFavorites(uuid);
  }

  @Delete('track/:uuid')
  @CheckAbilities(new DeleteFavTrackAbilityHandler())
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrackFromFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.removeTrackFromFav(uuid);
  }

  @Post('artist/:uuid')
  @CheckAbilities(new CreateFavArtistAbilityHandler())
  @HttpCode(StatusCodes.CREATED)
  async addArtistToFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.addArtistToFavorites(uuid);
  }

  @Delete('artist/:uuid')
  @CheckAbilities(new DeleteFavTrackAbilityHandler())
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtistFromFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.removeArtistFromFav(uuid);
  }

  @Post('album/:uuid')
  @CheckAbilities(new CreateFavAlbumAbilityHandler())
  @HttpCode(StatusCodes.CREATED)
  async addAlbumToFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.addAlbumToFavorites(uuid);
  }

  @Delete('album/:uuid')
  @CheckAbilities(new DeleteFavAlbumAbilityHandler())
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbumFromFav(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoriteService.removeAlbumFromFav(uuid);
  }
}
