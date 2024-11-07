import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AbilityFactory, AppAbility } from './factory/ability.factory';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY } from './ability.decorator';
import { UserService } from 'src/user/user.service';

export interface IAbilityHandler {
  handle(ability: AppAbility): boolean;
}

type AbilityHandlerCallback = (ability: AppAbility) => boolean;

export type AbilityHandler = IAbilityHandler | AbilityHandlerCallback;

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
    // ? Подумать как избавиться userService
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.reflector.get<AbilityHandler[]>(
      CHECK_ABILITY,
      context.getHandler(),
    );
    if (!rules) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.getById(request.user.id);
    const ability = this.abilityFactory.defineAbility(user);
    return rules.every((handler) => this.execAbilityHandler(handler, ability));
  }

  private execAbilityHandler(handler: AbilityHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
