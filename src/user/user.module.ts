import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserFollowRepository } from './userFollow.repository';
import { UserEntity } from 'src/entities/users.entity';
import { UserFollowEntity } from 'src/entities/userFollows.entity';
import { TokenService } from 'src/utils/verifyToken';
import { CityRepository } from './city.repository';
import { CityEntity } from 'src/entities/cities.entity';

import { KakaoStrategy } from './strategy/kakao.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RedisUserModule } from './redis/redis.user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserFollowEntity, CityEntity]),
    RedisUserModule.register(),
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
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserFollowRepository,
    TokenService,
    CityRepository,
    KakaoStrategy,
    JwtStrategy,
  ],
  exports: [
    UserService,
    UserRepository,
    UserFollowRepository,
    CityRepository,
    KakaoStrategy,
    JwtStrategy,
    PassportModule,
  ],
})
export class UserModule {}
