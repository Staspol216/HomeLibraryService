import { SetMetadata } from '@nestjs/common';
import { Action, Subject } from './factory/ability.factory';

export interface RequiredRule {
  action: Action;
  subject: Subject;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
