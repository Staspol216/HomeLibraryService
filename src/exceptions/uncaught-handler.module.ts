import { Module } from '@nestjs/common';
import { UncaughtHandler } from './uncaught-handler.services';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [UncaughtHandler],
  exports: [UncaughtHandler],
})
export class UncaughtModule {}
