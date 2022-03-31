import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Trello RESTful API')
    .setDescription('Trello RESTful API description')
    .setVersion('1.0.0')
    .addTag('trello')
    .build();
  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: true });
  SwaggerModule.setup('/api/docs', app, document);
  
  await app.listen(3000);
}
bootstrap();
