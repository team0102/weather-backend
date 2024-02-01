import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeORM.config';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClothesModule } from './clothes/clothes.module';

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
    AuthModule,
    ClothesModule,
  ],
})
export class AppModule {}
