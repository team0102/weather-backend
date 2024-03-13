import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserFollowRepository } from './userFollow.repository';
import { UserEntity } from './../entities/users.entity';
import { UserFollowEntity } from './../entities/userFollows.entity';
import { TokenService } from './../utils/verifyToken';
import { CityRepository } from './city.repository';
import { CityEntity } from './../entities/cities.entity';

import { KakaoStrategy } from './strategy/kakao.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RedisUserModule } from './redis/redis.user.module';
import { UserBlockEntity } from './../entities/userBlocks.entity';
import { UserBlockRepository } from './userBlock.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserFollowEntity,
      UserBlockEntity,
      CityEntity,
    ]),
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
    UserBlockRepository,
    TokenService,
    CityRepository,
    KakaoStrategy,
    JwtStrategy,
  ],
  exports: [
    UserService,
    UserRepository,
    UserFollowRepository,
    UserBlockRepository,
    CityRepository,
    KakaoStrategy,
    JwtStrategy,
    PassportModule,
  ],
})
export class UserModule {}
