import { Injectable, ConsoleLogger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
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

  customLog() {
    this.log('Custom log');
  }
}
