import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from './logger/logger.service';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

function initUncaughtHandlers(logger: Logger) {
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

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const AppLogger = new Logger();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Home Library')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/doc-json', app, document);
  app.useLogger(AppLogger);
  initUncaughtHandlers(AppLogger);
  const port = process.env.PORT || 4000;
  await app.listen(port);
}
bootstrap();
