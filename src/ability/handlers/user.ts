import { User } from 'src/user/entities/user.entity';
import { Action, AppAbility } from '../factory/ability.factory';
import { IAbilityHandler } from '../ability.guard';

export class ReadUserAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, User);
  }
}

export class CreateUserAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, User);
  }
}

export class UpdateUserAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, User);
  }
}

export class DeleteUserAbilityHandler implements IAbilityHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, User);
  }
}
