import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServiceUnavailableException, ValidationPipe } from '@nestjs/common';
import toobusy from 'toobusy-js';
import * as hpp from 'hpp';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(function (req, res, next) {
    if (toobusy()) {
      throw new ServiceUnavailableException('Service unavailable right now');
    } else {
      next();
    }
  });
  app.use(hpp());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
