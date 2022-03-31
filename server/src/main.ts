import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT ?? 4000;
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      next();
    });
    app.enableCors();
    app.use(cookieParser());
    await app.listen(PORT);
  } catch (err) {
    console.log(err);
  }
}

start();
