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
  ],
  exports: [UserService, UserRepository, UserFollowRepository, CityRepository],
})
export class UserModule {}
