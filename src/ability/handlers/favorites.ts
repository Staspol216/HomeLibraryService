import { Action, AppAbility } from '../factory/ability.factory';
import { IAbilityHandler } from '../ability.guard';
import { Favorites } from 'src/favorite/interfaces/favorite.interface';
import { FavTrack } from 'src/favorite/entities/FavTrack.entity';
import { FavAlbum } from 'src/favorite/entities/FavAlbum.entity';
import { FavArtist } from 'src/favorite/entities/FavArtist.entity';

export class ReadFavoritesAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Favorites);
  }
}

export class CreateFavTrackAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, FavTrack);
  }
}

export class DeleteFavTrackAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, FavTrack);
  }
}

export class CreateFavAlbumAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, FavAlbum);
  }
}

export class DeleteFavAlbumAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, FavAlbum);
  }
}

export class CreateFavArtistAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, FavArtist);
  }
}

export class DeleteFavArtistAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, FavArtist);
  }
}
