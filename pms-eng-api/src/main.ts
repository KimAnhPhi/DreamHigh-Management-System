import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS: FE dev http://localhost:5175 (Vite). Tránh origin '*' kết hợp credentials.
  app.enableCors({
    origin: [
      'http://localhost:5175',
      'http://127.0.0.1:5175',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global validation pipe with transformation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Set global prefix if desired (e.g. /api)
  app.setGlobalPrefix('api');

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
