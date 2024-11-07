import { Track } from 'src/track/entities/track.entity';
import { Action, AppAbility } from '../factory/ability.factory';
import { IAbilityHandler } from '../ability.guard';

export class ReadTrackAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Track);
  }
}

export class CreateTrackAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, Track);
  }
}

export class UpdateTrackAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, Track);
  }
}

export class DeleteTrackAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, Track);
  }
}
