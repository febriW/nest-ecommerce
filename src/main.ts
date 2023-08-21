import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist:true}))
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Mini E-commerce')
    .setDescription('Example Description')
    .setVersion('0.1')
    .addTag('ecommerce')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(configService.getOrThrow<number>('PORT'));
}
bootstrap();
