import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KakaoStrategy } from './strategy/kakao.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from '../user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// method. A--------------------------------------------------------------------

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          ),
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'kakao' }),
    // JwtModule.register({
    //   secret: 'test_secret_key',
    //   signOptions: {
    //     expiresIn: 3600,
    //   },
    // }),
    TypeOrmModule.forFeature([UserRepository]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy, JwtStrategy],
  exports: [KakaoStrategy, JwtStrategy, PassportModule],
})
export class AuthModule {}

// method. B--------------------------------------------------------------------

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.register({
//       secret: process.env.JWT_SECRET,
//       signOptions: { expiresIn: '60s' }, // JWT 유효 기간 설정
//     }),
//     UserModule,
//     TypeOrmModule.forFeature([UserRepository]),
//   ],
//   providers: [AuthService, KakaoStrategy],
//   exports: [AuthService],
// })
// export class AuthModule {}
