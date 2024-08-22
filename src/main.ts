import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
  .setTitle('FlexiWork')
  .setDescription('API documentation for FlexiWork')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app,config)

  SwaggerModule.setup('api/docs', app, document)

  await app.listen(4200, '0.0.0.0');
}
bootstrap();
