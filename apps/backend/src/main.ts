import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 5000;
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}
bootstrap();
