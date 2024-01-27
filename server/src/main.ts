import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app';
import { ValidationPipe } from '@nestjs/common';
import { PORT } from '@global';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(PORT);
}
bootstrap();
