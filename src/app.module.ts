import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeORM.config';
import { ConfigModule } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';

import { UserModule } from './user/user.module';
import { FeedModule } from './feed/feed.module';
import { ClothesModule } from './clothes/clothes.module';
import CatchException from './utils/CatchException';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeORMConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: '12h' },
    }),
    UserModule,
    FeedModule,
    ClothesModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchException,
    },
  ],
})
export class AppModule {}
