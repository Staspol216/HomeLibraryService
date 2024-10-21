import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: Logger) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, query, body } = req;
    this.logger.log('Request: ' + originalUrl, query, body);
    res.on('close', () => {
      const { statusCode } = res;
      this.logger.log(`Response: ${originalUrl} ${statusCode}`);
    });
    next();
  }
}
