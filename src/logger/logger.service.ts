import { Injectable, ConsoleLogger, Scope, LoggerService, LogLevel } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger implements LoggerService {
  constructor() {
    super();
    this.setLogLevels(['verbose']);
  }

  log(message: any, ...optionalParams: any[]) {
    super.log(arguments);
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(arguments);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(arguments);
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(arguments);
  }

  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(arguments);
  }
}
