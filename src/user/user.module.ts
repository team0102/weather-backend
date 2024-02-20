import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserFollowRepository } from './userFollow.repository';
import { UserEntity } from 'src/entities/users.entity';
import { UserFollowEntity } from 'src/entities/userFollows.entity';
import { TokenService } from 'src/utils/verifyToken';
import { CityRepository } from './city.repository';
import { CityEntity } from 'src/entities/cities.entity';
import { RedisService } from './redis.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserFollowEntity, CityEntity]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserFollowRepository,
    TokenService,
    CityRepository,
    RedisService,
  ],
  exports: [
    UserService,
    UserRepository,
    UserFollowRepository,
    CityRepository,
    RedisService,
  ],
})
export class UserModule {}
