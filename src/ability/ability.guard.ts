import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AbilityFactory } from './factory/ability.factory';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY, RequiredRule } from './ability.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
    // ? Надо подумать как избавиться от userService здесь. Кажется протекает слой абстракции
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.reflector.get<RequiredRule[]>(
      CHECK_ABILITY,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.getById(request.user.id);
    const ability = this.abilityFactory.defineAbility(user);
    return Boolean(
      rules?.every(({ action, subject }) => ability.can(action, subject)),
    );
  }
}
