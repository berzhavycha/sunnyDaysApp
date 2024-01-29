import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; 
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  
  const configService = app.get(ConfigService); 
  const port = configService.get<number>('PORT'); 

  await app.listen(port);
}
bootstrap();
