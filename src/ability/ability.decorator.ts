import { SetMetadata } from '@nestjs/common';

import { AbilityHandler } from './ability.guard';

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...handlers: AbilityHandler[]) =>
  SetMetadata(CHECK_ABILITY, handlers);
