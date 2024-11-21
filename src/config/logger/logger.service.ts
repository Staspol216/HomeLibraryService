import {
  Injectable,
  ConsoleLogger,
  Scope,
  LoggerService,
} from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger implements LoggerService {
  constructor() {
    super();
    this.setLogLevels(['verbose']);
  }
}
