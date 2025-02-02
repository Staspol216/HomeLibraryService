import { Global, Module } from '@nestjs/common';
import { AbilityFactory } from './factory/ability.factory';

@Global()
@Module({
  providers: [AbilityFactory],
  exports: [AbilityFactory],
})
export class AbilityModule {}
