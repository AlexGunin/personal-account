import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT ?? 4000;
    await app.listen(PORT);
  } catch (err) {
    console.log(err);
  }
}

start();
