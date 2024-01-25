import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app';
import { ValidationPipe } from '@nestjs/common';
import { PORT } from '@global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
