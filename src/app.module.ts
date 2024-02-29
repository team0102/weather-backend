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
import { ServeStaticModule } from '@nestjs/serve-static';
import { PUBLIC_FOLDER_PATH } from './common/const/path.const';
import { ChatsGateway } from './chats/chats.gateway';

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
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_FOLDER_PATH,
      serveRoot: '/public'
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchException,
    },
    ChatsGateway
  ],
})
export class AppModule {}
