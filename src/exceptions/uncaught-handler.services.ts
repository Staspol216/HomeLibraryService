import { Injectable } from '@nestjs/common';
import { Logger } from 'src/logger/logger.service';

@Injectable()
export class UncaughtHandler {
  constructor(logger: Logger) {
    process.on('uncaughtException', (err, origin) => {
      logger.error(
        process.stderr.fd,
        `Caught exception: ${err}`,
        `Exception origin: ${origin}\n`,
      );
    });
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });
  }
}
