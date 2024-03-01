import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  app.enableCors({
    // 소셜로그인을 위한 설정(바로 위 한줄짜리 cors가 기존 설정)
    origin: function (origin, callback) {
      callback(null, true);
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
        //excludeExtraneousValues: true, // 파일 업로드 시에 필드에 대한 유효성 검사 제외
      },
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
