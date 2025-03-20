import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 5000;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      always: true
    })
  );
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  });
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}
bootstrap();
