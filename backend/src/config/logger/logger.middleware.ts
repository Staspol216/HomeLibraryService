import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, query, body } = req;
    this.logger.log(`Request: ${originalUrl}`, query, body);
    res.on('close', () => {
      const { statusCode } = res;
      this.logger.log(`Response: ${originalUrl} ${statusCode}`);
    });
    next();
  }
}
