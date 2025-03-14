import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 5000;
  await app.listen(port);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      always: true
    })
  );

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}
bootstrap();
