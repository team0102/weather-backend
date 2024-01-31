import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeORM.config';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeORMConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY, // 실행은 되나, 확인 필요
      signOptions: { expiresIn: '12h' },
    }),
    UserModule,
    AuthModule,
  ],
  // controllers: [AppController, UserController],
  // providers: [AppService, UserService, JwtModule],

  // controllers: [],
  // providers: [],
  // ],
  // controllers: [AppController, UserController],
  // providers: [AppService, UserService],
})
export class AppModule {}
