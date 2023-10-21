import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // permitir las peticiones desde el frontend
  app.enableCors({
    origin: 'http://localhost:4321',
  });
  await app.listen(3000);
}
bootstrap();
