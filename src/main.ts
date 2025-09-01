import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  await app.listen(3000).then(() => {
    console.log('Server is running on http://localhost:3000');
  }).catch((err) => {
    console.error('Error starting server:', err);
  });
}
bootstrap();
