import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { origin: ['http://localhost:4200'], credentials: true },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use('/', express.static(process.cwd() + '\\uploads'));

  app.use(cookieParser());
  await app.listen(parseInt(process.env.PORT) || 5000);
}
bootstrap();
