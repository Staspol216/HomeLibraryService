import { Artist } from 'src/artist/entities/artist.entity';
import { Action, AppAbility } from '../factory/ability.factory';
import { IAbilityHandler } from '../ability.guard';

export class ReadArtistAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Artist);
  }
}

export class CreateArtistAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, Artist);
  }
}

export class UpdateArtistAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, Artist);
  }
}

export class DeleteArtistAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, Artist);
  }
}
