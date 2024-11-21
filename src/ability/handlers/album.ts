import { Album } from 'src/album/entities/album.entity';
import { Action, AppAbility } from '../factory/ability.factory';
import { IAbilityHandler } from '../ability.guard';

export class ReadAlbumAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Album);
  }
}

export class CreateAlbumAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, Album);
  }
}

export class UpdateAlbumAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, Album);
  }
}

export class DeleteAlbumAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, Album);
  }
}
